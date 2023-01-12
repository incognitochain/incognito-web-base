import { Col, Row } from 'antd';
import { useIncognitoWallet } from 'components/Core/IncognitoWallet/IncongitoWallet.useContext';
import { InputField } from 'components/Core/ReduxForm';
import { ArrowDown } from 'components/Core/ReduxForm/SelectionField/SelectionField.styled';
import { useModal } from 'components/Modal';
import ModalTokens from 'components/Modal/Modal.tokens';
import { BIG_COINS } from 'constants/token';
import PToken from 'models/model/pTokenModel';
import SelectedPrivacy from 'models/model/SelectedPrivacyModel';
import React, { memo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { compose } from 'redux';
import { Field, reduxForm } from 'redux-form';
import { incognitoWalletAccountSelector } from 'state/incognitoWallet';
import { getPrivacyByTokenIdentifySelectors, unshieldableTokens } from 'state/token';

import { FORM_CONFIGS } from './CollectionDetail.constant';
import enhance from './CollectionDetail.enhanceFooter';
import { ButtonBuy, Container, SelectionToken } from './CollectionDetail.footer.styled';

const Address = () => {
  return (
    <Col className="address-group">
      <Field
        component={InputField}
        name={FORM_CONFIGS.address}
        inputType={FORM_CONFIGS.address}
        componentProps={{
          placeholder: 'Recipient Address',
        }}
        // validate={validateAddress}
      />
      <p className="note">
        (*) this is an Ethereum address that the buying NFT will be sent to, we recommend using a fresh address here to
        maximize your anonymity.
      </p>
    </Col>
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

const Balance = memo(({ selectedToken }: { selectedToken: SelectedPrivacy | undefined }) => {
  const balanceStr = React.useMemo(() => {
    if (!selectedToken || !selectedToken.tokenID) return undefined;
    return `${selectedToken.formatAmount || 0} ${selectedToken.symbol}`;
  }, [selectedToken?.tokenID]);

  if (!balanceStr) return null;

  return (
    <Col className="wrap-balance">
      <p className="header">Your balance</p>
      <p className="amount">{balanceStr}</p>
    </Col>
  );
});

const StickyFooter = () => {
  const [selectedToken, setSelectedToken] = React.useState<PToken | undefined>();
  const incAccount = useSelector(incognitoWalletAccountSelector);
  const { requestSignTransaction, isIncognitoInstalled, requestIncognitoAccount, showPopup } = useIncognitoWallet();

  const tokens = useSelector(unshieldableTokens).filter(
    (token) => token.isMainETH || token.tokenID === BIG_COINS.ETH_UNIFIED.tokenID
  );

  const selectedTokenPrivacy = useSelector(getPrivacyByTokenIdentifySelectors)(
    selectedToken ? selectedToken.identify : ''
  );

  const onClickBuy = async () => {};

  useEffect(() => {
    tokens.length > 0 && selectedToken === undefined && setSelectedToken(tokens[0]);
  }, [tokens]);

  return (
    <Container>
      <form className="default-max-width form">
        <Row>
          <Address />
          <SelectToken tokens={tokens} selectedToken={selectedToken} onSelectToken={setSelectedToken} />
          <Balance selectedToken={selectedTokenPrivacy} />
          <ButtonBuy type="button" onClick={!incAccount ? showPopup : onClickBuy}>
            <p className="text-buy">
              {!incAccount ? (isIncognitoInstalled() ? 'Connect wallet' : 'Install wallet') : 'Buy  |  2 items'}
            </p>
          </ButtonBuy>
        </Row>
      </form>
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
