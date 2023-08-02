import { useModal } from 'components/Modal';
import LoadingTransaction from 'components/Modal/Modal.transaction';
import accountService from 'pages/IncWebWallet/services/wallet/accountService';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { isValid } from 'redux-form';
import { defaultAccountWalletSelector } from 'state/account/account.selectors';
import { useAppDispatch } from 'state/hooks';
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
    const dispatch = useAppDispatch();
    const { setModal, closeModal } = useModal();
    const accountSender = useSelector(defaultAccountWalletSelector);
    const isFormValid = useSelector((state) => isValid(FORM_CONFIGS.formName)(state));
    const sendBtnDisable = !isFormValid;

    const { inscriptionId } = props;

    const handleSendInscription = async (formData: any) => {
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
          data: <LoadingTransaction pendingText="Please wait a moment" />,
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

        toast.success('Send Success');

        // const transactionRecepitData = getConfirmTxBuilder({
        //   tx,
        //   address: toAddress,
        //   amount: inputOriginalAmount,
        //   networkFee: networkFeeAmount,
        //   sendToken: followTokenSelectedData as SelectedPrivacy,
        // });

        //Dismiss Modal Loading
        closeModal();

        //Show Transaciton Receipt
        // setTimeout(() => {
        //   setModal({
        //     closable: false,
        //     data: (
        //       <TransactionReceipt
        //         transactionReceiptData={transactionRecepitData}
        //         onClose={() => {
        //           closeModal();
        //         }}
        //       />
        //     ),
        //     isTransparent: false,
        //     rightHeader: undefined,
        //     title: '',
        //     hideHeaderDefault: true,
        //   });
        // }, 500);
      } catch (e) {
        console.log('handleSendInscription ERROR: ', e);
        toast.error(parseError(e));
      } finally {
        closeModal();
      }
    };

    return <WrappedComponent {...{ ...props, handleSendInscription, sendBtnDisable }} />;
  };
  FormSendComp.displayName = 'FormSendComp.enhanceSendIncription';
  return FormSendComp;
};

export default enhanceSend;
