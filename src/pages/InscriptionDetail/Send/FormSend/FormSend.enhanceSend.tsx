import { useModal } from 'components/Modal';
import LoadingTransaction from 'components/Modal/Modal.transaction';
import accountService from 'pages/IncWebWallet/services/wallet/accountService';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { isValid } from 'redux-form';
import { defaultAccountWalletSelector } from 'state/account/account.selectors';
import { parseError } from 'utils/errorHelper';

// import { getConfirmTxBuilder } from '../TransactionReceipt';
// import TransactionReceipt from '../TransactionReceipt/TransactionReceipt';
import { FORM_CONFIGS } from './FormSend.constant';
const { ACCOUNT_CONSTANT, PrivacyVersion, setShardNumber } = require('incognito-chain-web-js/build/web/wallet');
export interface enhanceSendAction {
  handleSendInscription: (value: string, field: string) => any;
}

const enhanceSend = (WrappedComponent: any) => {
  const FormSendComp = (props: any) => {
    const { setModal, closeModal } = useModal();
    const accountSender = useSelector(defaultAccountWalletSelector);
    const isFormValid = useSelector((state) => isValid(FORM_CONFIGS.formName)(state));
    const sendBtnDisable = !isFormValid;

    const { inscriptionId, inscription } = props;

    const handleSendInscription = async (formData: any) => {
      let isSendSuccess;

      try {
        // updateMetric().then();

        if (!isFormValid || !accountSender || !inscription) return;

        //Show Modal Loading
        setModal({
          isTransparent: false,
          rightHeader: undefined,
          hideHeaderDefault: true,
          title: '',
          closable: false,
          data: <LoadingTransaction pendingText="" />,
        });

        const { memo = '', toAddress = '' } = formData;
        const networkFeeAmount = ACCOUNT_CONSTANT.MAX_FEE_PER_TX || 0;

        const payload = {
          fee: networkFeeAmount,
          info: memo,
          txType: ACCOUNT_CONSTANT.TX_TYPE.SEND,
          version: PrivacyVersion.ver3,
          tokenID: inscriptionId,
          tokenPayments: [
            {
              PaymentAddress: toAddress,
              Amount: 1,
              Message: memo,
            },
          ],
        };

        console.log('SEND INSCRIPTION: PAYLOAD ====>>>> ', payload);

        let tx;

        if (typeof setShardNumber === 'function') {
          await setShardNumber(8);
        }

        tx = await accountService.createAndSendPrivacyToken({
          ...payload,
          accountSender,
        });

        console.log('SEND INSCRIPTION: tx ====>>>> ', tx);

        if (!tx) return;

        const historyData = {
          eventType: 'SEND',
          txId: tx.txId,
          fileSize: inscription?.size,
          fileType: inscription?.content_type,
          txType: tx.txType,
          memo,
          timestamp: Date.now(),
          tokenID: tx.tokenID,
          toAddress,
        };

        await accountService.setInscriptionsHistory({ accountWallet: accountSender, historyData });

        toast.success('Sent successfully.');
        isSendSuccess = true;
      } catch (e) {
        console.log('handleSendInscription ERROR: ', e);
        toast.error(parseError(e));
        isSendSuccess = false;
      } finally {
        closeModal(); // Close Modal Loading
        if (isSendSuccess) {
          closeModal(); // Close Modal Send
        }
      }
    };

    return <WrappedComponent {...{ ...props, handleSendInscription, sendBtnDisable }} />;
  };
  FormSendComp.displayName = 'FormSendComp.enhanceSendIncription';
  return FormSendComp;
};

export default enhanceSend;
