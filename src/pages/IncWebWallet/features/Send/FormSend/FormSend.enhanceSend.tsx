import { useModal } from 'components/Modal';
import LoadingTransaction from 'components/Modal/Modal.transaction';
import SelectedPrivacy from 'models/model/SelectedPrivacyModel';
import useFollowTokenSelected from 'pages/IncWebWallet/hooks/useFollowTokenSelected';
import accountService from 'pages/IncWebWallet/services/wallet/accountService';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { isValid } from 'redux-form';
import { defaultAccountWalletSelector } from 'state/account/account.selectors';
import { useAppDispatch } from 'state/hooks';
import convert from 'utils/convert';
import { parseError } from 'utils/errorHelper';

import { getConfirmTxBuilder } from '../TransactionReceipt';
import TransactionReceipt from '../TransactionReceipt/TransactionReceipt';
import { FORM_CONFIGS } from './FormSend.constant';
const { ACCOUNT_CONSTANT, PrivacyVersion, setShardNumber } = require('incognito-chain-web-js/build/web/wallet');
export interface enhanceSendAction {
  handleSendAnonymously: (value: string, field: string) => any;
}

const enhanceSend = (WrappedComponent: any) => {
  const FormSendComp = (props: any) => {
    const dispatch = useAppDispatch();
    const { setModal, closeModal } = useModal();
    const followTokenSelectedData = useFollowTokenSelected();
    const accountSender = useSelector(defaultAccountWalletSelector);

    const isFormValid = useSelector((state) => isValid(FORM_CONFIGS.formName)(state));
    const sendBtnDisable = !isFormValid;

    const { isMainCrypto, pDecimals, tokenID } = props;

    const handleSendAnonymously = async (formData: any) => {
      try {
        // updateMetric().then();

        if (!isFormValid || !accountSender) return;

        //Show Modal Loading
        setModal({
          isTransparent: false,
          rightHeader: undefined,
          hideHeaderDefault: true,
          title: '',
          closable: false,
          data: <LoadingTransaction pendingText="" />,
        });

        const { amount = '0.00', memo = '', toAddress = '' } = formData;
        const networkFeeAmount = ACCOUNT_CONSTANT.MAX_FEE_PER_TX || 0;

        const inputOriginalAmount = convert
          .toOriginalAmount({
            humanAmount: `${convert.toNumber({ text: amount, autoCorrect: true }) || 0}`,
            decimals: pDecimals,
          })
          .toString();

        let payload: any = {
          fee: networkFeeAmount,
          info: memo,
          txType: ACCOUNT_CONSTANT.TX_TYPE.SEND,
          tokenID,
          version: PrivacyVersion.ver3,
        };

        if (isMainCrypto) {
          payload = {
            ...payload,
            prvPayments: [
              {
                PaymentAddress: toAddress,
                Amount: inputOriginalAmount,
                Message: memo,
              },
            ],
          };
        } else {
          // Handle send privacy token
          payload = {
            ...payload,
            tokenID,
            tokenPayments: [
              {
                PaymentAddress: toAddress,
                Amount: inputOriginalAmount,
                Message: memo,
              },
            ],
          };
        }

        let tx;
        if (typeof setShardNumber === 'function') {
          await setShardNumber(8);
        }
        if (isMainCrypto) {
          tx = await accountService.createAndSendNativeToken({
            ...payload,
            accountSender,
          });
        } else {
          tx = await accountService.createAndSendPrivacyToken({
            ...payload,
            accountSender,
          });
        }
        if (!tx) return;
        const transactionRecepitData = getConfirmTxBuilder({
          tx,
          address: toAddress,
          amount: inputOriginalAmount,
          networkFee: networkFeeAmount,
          sendToken: followTokenSelectedData as SelectedPrivacy,
        });

        //Dismiss Modal Loading
        closeModal();

        //Show Transaciton Receipt
        setTimeout(() => {
          setModal({
            closable: false,
            data: (
              <TransactionReceipt
                transactionReceiptData={transactionRecepitData}
                onClose={() => {
                  closeModal();
                }}
              />
            ),
            isTransparent: false,
            rightHeader: undefined,
            title: '',
            hideHeaderDefault: true,
          });
        }, 500);
      } catch (e) {
        console.log('handleSendAnonymously ERROR: ', e);
        toast.error(parseError(e));
      } finally {
        closeModal();
      }
    };

    return <WrappedComponent {...{ ...props, handleSendAnonymously, sendBtnDisable }} />;
  };
  FormSendComp.displayName = 'FormSendComp.enhanceSend';
  return FormSendComp;
};

export default enhanceSend;
