import { Col, Row } from 'antd';
import { getIncognitoInject, useIncognitoWallet } from 'components/Core/IncognitoWallet/IncongitoWallet.useContext';
import Loader from 'components/Core/Loader';
import { InputField, validator } from 'components/Core/ReduxForm';
import { ArrowDown } from 'components/Core/ReduxForm/SelectionField/SelectionField.styled';
import { useModal } from 'components/Modal';
import ModalTokens from 'components/Modal/Modal.tokens';
import LoadingTransaction from 'components/Modal/Modal.transaction';
import debounce from 'lodash/debounce';
import PToken from 'models/model/pTokenModel';
import SelectedPrivacy from 'models/model/SelectedPrivacyModel';
import {
  actionEstimateFee,
  actionSelectedPrivacyTokenID,
  actionSetEstimateFeeError,
  clearSelectedTokens,
} from 'pages/Pnft/Pnft.actions';
import { buyCollectionSelector } from 'pages/Pnft/Pnft.selectors';
import { actionSetToken } from 'pages/Swap/features/FormDeposit/FormDeposit.actions';
import { getTokenPayments } from 'pages/Swap/features/FormUnshield/FormUnshield.utils';
import React, { memo, useCallback, useEffect } from 'react';
import { isMobile } from 'react-device-detect';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { compose } from 'redux';
import { blur, Field, reduxForm } from 'redux-form';
import { incognitoWalletAccountSelector } from 'state/incognitoWallet';

import { TransactionSubmittedContent } from '../../../../components/Core/TransactionConfirmationModal';
import { PRIVATE_TOKEN_CURRENCY_TYPE } from '../../../../constants';
import rpcPBlur from '../../../../services/rpcPBlur';
import { setSwapTx } from '../../../Swap/Swap.storage';
import { FORM_CONFIGS } from './CollectionDetail.constant';
import enhance from './CollectionDetail.enhanceFooter';
import { ButtonBuy, Container, SelectionToken } from './CollectionDetail.footer.styled';
const { ACCOUNT_CONSTANT } = require('incognito-chain-web-js/build/wallet');

const Address = ({ showNote }: { showNote: boolean }) => {
  const getAddressValidator = React.useCallback(() => {
    return validator.combinedEtherAddress;
  }, []);
  const validateAddress = getAddressValidator();
  return (
    <form
      className="form address-group"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <Field
        component={InputField}
        name={FORM_CONFIGS.address}
        inputType={FORM_CONFIGS.address}
        componentProps={{
          placeholder: 'Ethereum Recipient Address',
        }}
        validate={validateAddress}
      />
      {showNote && (
        <p className="note">
          (*) this is an Ethereum address that the buying NFT will be sent to, we recommend using a fresh address here
          to maximize your anonymity.
        </p>
      )}
    </form>
  );
};

const SelectToken = memo(
  ({
    tokens,
    selectedToken,
    onSelectToken,
  }: {
    tokens: SelectedPrivacy[];
    selectedToken: PToken | undefined;
    onSelectToken: (token: PToken) => void;
  }) => {
    const { setModal } = useModal();

    const handleSelectToken = ({ token }: { token: PToken }) => onSelectToken(token);

    const showTokensList = () => {
      setModal({
        closable: true,
        data: <ModalTokens tokens={tokens} onSelect={handleSelectToken} showNetwork={true} />,
        isTransparent: false,
        rightHeader: undefined,
        title: 'Select a Token',
        isSearchTokenModal: true,
      });
    };

    if (!selectedToken) return null;

    return (
      <SelectionToken onClick={showTokensList} hidden={!selectedToken}>
        {!!selectedToken && <img className="token-icon" src={selectedToken.iconUrl} alt="token-icon" />}
        {!!selectedToken && <p>{selectedToken.symbol}</p>}
        {!!selectedToken && <ArrowDown size={24} color="white" />}
      </SelectionToken>
    );
  }
);

const Balance = memo(
  ({
    title,
    content,
    className,
    loading,
  }: {
    title: string;
    content?: string;
    className?: string;
    loading?: boolean;
  }) => {
    if (!loading && !content) return null;
    return (
      <Col className="wrap-balance">
        <p className="header">{title}</p>
        {loading ? <Loader stroke="white" size="20px" /> : <p className={`amount ${className || ''}`}>{content}</p>}
      </Col>
    );
  }
);

const StickyFooter = () => {
  const incAccount = useSelector(incognitoWalletAccountSelector);
  const history = useHistory();
  const dispatch = useDispatch();
  const [isCanBuy, setIsCanBuy] = React.useState<boolean>(true);
  const {
    valid: isValidForm,
    inputAddress,
    isEstimating,
    fee,
    apiError,
    tokens,
    selectedTokenPrivacy,
    buyAmount,
    selectedItems,
    validateErr,
    isValidAmount,
    isValidNetworkFee,
    showDeposit,
  } = useSelector(buyCollectionSelector);
  const { requestSignTransaction, isIncognitoInstalled, requestIncognitoAccount, showPopup } = useIncognitoWallet();
  const { setModal, clearAllModal } = useModal();

  const renderError = () => {
    const showError = incAccount && ((!isCanBuy && validateErr) || apiError);
    if (!showError) return null;
    return (
      <p className="current-error ">
        {!!showError && `${validateErr}`}{' '}
        {showDeposit && (
          <span
            onClick={() => {
              history.push('/deposit');
              const token: any = selectedTokenPrivacy?.isUnified
                ? selectedTokenPrivacy.listUnifiedToken.find((token) => token.currencyType === 1)
                : selectedTokenPrivacy;
              if (token) {
                dispatch(actionSetToken({ sellToken: token }));
              }
            }}
            style={{ textDecoration: 'underline', cursor: 'pointer' }}
          >
            deposit now
          </span>
        )}
      </p>
    );
  };

  const onClickBuy = async () => {
    // check valid address
    if (!isValidForm) {
      return dispatch(blur(FORM_CONFIGS.formName, FORM_CONFIGS.address, inputAddress, true));
    }
    if (isEstimating || !fee) return;

    // show error message
    if (!isValidAmount || !isValidNetworkFee) {
      return setIsCanBuy(false);
    }

    try {
      // handle buyNFT
      setModal({
        isTransparent: false,
        closable: true,
        data: <LoadingTransaction pendingText="Waiting For Confirmation" />,
      });

      // building payload
      // Get OTA Receiver and Burner address
      const shardID = fee.getFeeAddressShardID();

      const incognito = getIncognitoInject();
      const { result }: { result: any } = await incognito.request({
        method: 'wallet_requestAccounts',
        params: { senderShardID: shardID },
      });
      const otaReceiver = result?.otaReceiver;
      const feeRefundOTA = result.otaReceiverWithCfg;

      const incToken = selectedTokenPrivacy.isUnified
        ? selectedTokenPrivacy.listUnifiedToken.find((token) => token.networkID === 1)
        : selectedTokenPrivacy;
      const incTokenID = incToken?.tokenID;

      let callContract = fee.callContract;
      if (callContract.startsWith('0x')) {
        callContract = callContract.slice(2);
      }
      let withdrawAddress = inputAddress;
      if (withdrawAddress.startsWith('0x')) {
        withdrawAddress = withdrawAddress.slice(2);
      }
      const metadata = {
        Data: [
          {
            IncTokenID: incTokenID,
            RedepositReceiver: otaReceiver,
            BurningAmount: buyAmount.originalAmount,
            ExternalNetworkID: incToken?.networkID || 1,
            ExternalCalldata: fee.calldata,
            ExternalCallAddress: callContract,
            ReceiveToken: fee.receiveToken,
            WithdrawAddress: withdrawAddress,
          },
        ],
        BurnTokenID: selectedTokenPrivacy.tokenID,
        Type: 348,
      };

      const prvPayments: any[] = [];
      const tokenPayments = await getTokenPayments({
        data: [
          {
            paymentAddress: fee.fee?.feeAddress,
            amount: fee.getFeeAmount(),
          },
        ],
        burnAmount: buyAmount.originalAmount,
      });
      const payload = {
        metadata,
        info: '',
        networkFee: ACCOUNT_CONSTANT.MAX_FEE_PER_TX,
        prvPayments,
        tokenPayments,
        tokenID: selectedTokenPrivacy.tokenID,
        txType: 7,
        receiverAddress: inputAddress,
        isSignAndSendTransaction: false,
      };
      console.log('LOGS: PAYLOAD ', {
        prvPayments,
        tokenPayments,
        metadata,
      });

      try {
        const tx = await requestSignTransaction(payload);
        await rpcPBlur.submitBuyTx({
          txRaw: tx.rawData,
          feeRefundOTA,
        });
        if (tx.txHash) {
          // Save local history TX
          setSwapTx({
            interPAppName: '',
            interPAppNetwork: '',
            txHash: tx.txHash,
            time: new Date().getTime(),
            appName: 'blur',
            buyTokenID: selectedTokenPrivacy.tokenID,
            buyAmountText: buyAmount.burnFormatAmount,
          });
        }
        clearAllModal();
        dispatch(clearSelectedTokens());
        setTimeout(() => {
          setModal({
            isTransparent: false,
            closable: true,
            data: <TransactionSubmittedContent chainId={PRIVATE_TOKEN_CURRENCY_TYPE.INCOGNITO} hash={tx.txHash} />,
          });
        }, 500);
      } catch (error) {
        clearAllModal();
        throw error;
      }
    } catch (error) {
      console.error('ERROR: ', error);
      const errorMessage = typeof error === 'string' ? error : error?.message || '';
      if (!errorMessage || errorMessage === 'Action Reject') return;
      dispatch(actionSetEstimateFeeError(errorMessage));
    }
  };
  const onEstimateFee = () => {
    const tokenID = selectedTokenPrivacy?.tokenID;
    if (!tokenID || !buyAmount.outchainOriginalAmount) return;
    dispatch(
      actionEstimateFee({ burnTokenID: tokenID, outchainOriginalAmount: buyAmount.outchainOriginalAmount.toString() })
    );
  };

  const debounceEstimateFee = useCallback(debounce(onEstimateFee, 300), [
    selectedTokenPrivacy?.tokenID,
    buyAmount.amountNumb,
  ]);

  const onSetSelectedPrivacyTokenID = (token: PToken) => {
    if (!token.identify || !token.symbol) return;
    dispatch(actionSelectedPrivacyTokenID(token.identify));
  };

  // First time set tokenID
  useEffect(() => {
    tokens.length > 0 && selectedTokenPrivacy.tokenID === undefined && onSetSelectedPrivacyTokenID(tokens[0]);
  }, [tokens]);

  // Estimate Fee
  useEffect(() => {
    if (!inputAddress) return;
    debounceEstimateFee();
  }, [inputAddress, selectedItems.length, selectedTokenPrivacy?.tokenID]);

  if (isMobile) return null;

  return (
    <Container hidden={!selectedItems.length}>
      <Row className="default-max-width">
        <Address showNote={!isValidForm && !!inputAddress} />
        <SelectToken tokens={tokens} selectedToken={selectedTokenPrivacy} onSelectToken={onSetSelectedPrivacyTokenID} />
        <Balance
          title="Your balance"
          content={
            selectedTokenPrivacy && selectedTokenPrivacy.tokenID
              ? `${selectedTokenPrivacy.formatAmount || 0} ${selectedTokenPrivacy.symbol}`
              : undefined
          }
        />
        <Balance
          title="Fee"
          content={
            !!fee
              ? `${fee.getFeeFormatAmount(selectedTokenPrivacy.pDecimals)} ${selectedTokenPrivacy.symbol}`
              : undefined
          }
          className="fee"
          loading={isEstimating}
        />
        <div className="spacing" />
        {!incAccount && (
          <ButtonBuy type="button" onClick={showPopup}>
            <p className="text-buy">{isIncognitoInstalled() ? 'Connect wallet' : 'Install wallet'}</p>
          </ButtonBuy>
        )}
        {incAccount && !!selectedItems.length && (
          <div style={{ display: 'flex', alignItems: 'flex-end', flexDirection: 'column' }}>
            <ButtonBuy type="submit" onClick={onClickBuy}>
              <p className="text-buy">
                {selectedItems.length > 0
                  ? `Buy ${selectedItems.length === 1 ? '1 item' : `${selectedItems.length} items`}`
                  : 'Buy'}
              </p>
              {selectedItems.length > 0 && <p className="text-buy spacing">{`|`}</p>}
              {selectedItems.length > 0 && <p className="text-buy">{buyAmount.visibleStr}</p>}
            </ButtonBuy>
            {renderError()}
          </div>
        )}
      </Row>
    </Container>
  );
};

export default compose(
  reduxForm({
    form: FORM_CONFIGS.formName,
    destroyOnUnmount: false,
  }),
  enhance
)(memo(StickyFooter)) as any;
