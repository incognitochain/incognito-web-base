import BigNumber from 'bignumber.js';
import { useIncognitoWallet } from 'components/Core/IncognitoWallet/IncongitoWallet.useContext';
import { useModal } from 'components/Modal';
import LoadingTransaction from 'components/Modal/Modal.transaction';
import { PRV } from 'constants/token';
import useThrottle from 'hooks/useThrottle';
import { WalletState } from 'pages/IncWebWallet/core/types';
import useUnlockWallet from 'pages/IncWebWallet/hooks/useUnlockWalelt';
import useWalletController from 'pages/IncWebWallet/hooks/useWalletController';
import accountService from 'pages/IncWebWallet/services/wallet/accountService';
import React, { useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';
import { defaultAccountWalletSelector } from 'state/account/account.selectors';
import { useAppSelector } from 'state/hooks';
import { incognitoWalletAccountSelector } from 'state/incognitoWallet';
import { webWalletStateSelector } from 'state/masterKey';
import { getPrivacyDataByTokenIDSelector } from 'state/token';
// import { Trash } from 'react-feather';
import { humanFileSize } from 'utils/fileUtils';
import format from 'utils/format';

import { parseError } from '../../utils/errorHelper';
import { MAXIMUM_SIZE_FILE, MINIMUM_PRV_BALANCE, SUPPORTED_FILE_EXTENSIONS } from './CreateInscription.constants';
import { Container, ErrorMessage, InscribeNowButton, UploadFileZone } from './CreateInscription.styles';

const CreateInscription = () => {
  const { showUnlockModal } = useUnlockWallet();
  const incAccount = useAppSelector(incognitoWalletAccountSelector);
  const webWalletState = useAppSelector(webWalletStateSelector);
  const { isIncognitoInstalled } = useIncognitoWallet();
  const { setModal, closeModal } = useModal();

  const walletController = useWalletController();
  const prvTokenInfo = useAppSelector(getPrivacyDataByTokenIDSelector)(PRV.id);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
  const accountSender = useAppSelector(defaultAccountWalletSelector);

  // const dispatch = useDispatch();
  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject, acceptedFiles } = useDropzone({
    accept: SUPPORTED_FILE_EXTENSIONS,
  });

  const _walletAction = () => showUnlockModal();

  const prvBalance = useMemo(() => {
    return new BigNumber(prvTokenInfo?.amount || 0);
  }, [prvTokenInfo]);

  const fileUpload = useMemo(() => {
    return acceptedFiles && acceptedFiles.length > 0 ? acceptedFiles[0] : undefined;
  }, [acceptedFiles]);

  const totalFileSize = useMemo(() => {
    let totalSize = 0;
    acceptedFiles.map((file) => (totalSize += file.size || 0));
    return totalSize;
  }, [acceptedFiles]);

  console.log('FILE SIZE: ', totalFileSize);

  const button = useMemo(() => {
    let text = '';

    if (walletController.isWalletExtension) {
      if (!isIncognitoInstalled()) {
        text = 'Install Wallet';
      } else if (!incAccount) {
        text = 'Connect Wallet';
      } else {
        text = 'Create Now';
      }
    } else if (walletController.isWalletWeb) {
      if (webWalletState === WalletState.uninitialized) {
        text = 'Install Wallet';
      } else if (!incAccount || webWalletState === WalletState.locked) {
        text = 'Unlock Wallet';
      } else {
        text = 'Create Now';
      }
    } else {
      text = 'Install Wallet';
    }

    return {
      text,
      isConnected: !!incAccount,
    };
  }, [incAccount, isIncognitoInstalled, webWalletState]);

  // console.log('ALL Info ', {
  //   isFocused,
  //   isDragAccept,
  //   isDragReject,
  //   acceptedFiles,
  //   totalFileSize,
  //   prvBalance,
  //   fileUpload,
  // });

  const isEnoughtPRVBalance = useMemo(() => {
    if (prvBalance.isLessThan(new BigNumber(MINIMUM_PRV_BALANCE))) {
      return false;
    }
    return true;
  }, [prvBalance, prvTokenInfo]);

  const checkValidate = () => {
    let errorMessage = 'Something went wrong';
    let isValidate = true;
    if (!fileUpload) {
      errorMessage = `File is Required`;
      isValidate = false;
    } else {
      // Check MINIMUM file's size;
      // if (totalFileSize < MINIMUM_SIZE_FILE) {
      //   errorMessage = `File's size must be larger than ${MINIMUM_SIZE_FILE}`;
      //   isValidate = false;
      // }

      // Check MAXIMUM file's size;
      if (totalFileSize > MAXIMUM_SIZE_FILE) {
        errorMessage = `File's size must be smaller than ${humanFileSize(MAXIMUM_SIZE_FILE)}`;
        isValidate = false;
      }

      // Validate Your PRV BalanceisValid
      // if (prvBalance.isLessThan(new BigNumber(MINIMUM_PRV_BALANCE))) {
      //   errorMessage = `Your PRV balance must be larger than or equal ${format.amountVer2({
      //     originalAmount: Number(MINIMUM_PRV_BALANCE),
      //     decimals: prvTokenInfo.pDecimals,
      //   })}PRV`;
      //   isValidate = false;
      // }
    }

    return {
      isValidate,
      errorMessage,
    };
  };

  const inscribeNowOnClick = useThrottle(async () => {
    if (!isEnoughtPRVBalance) return;

    const { isValidate, errorMessage } = checkValidate();
    if (isValidate) {
      //Show Modal Loading
      setModal({
        isTransparent: false,
        rightHeader: undefined,
        hideHeaderDefault: true,
        title: '',
        closable: false,
        data: <LoadingTransaction pendingText="" />,
      });

      const burningCallback = async () => {
        console.log('Crreate Inscription Success Callback !!! ===> TO DO');
      };
      const dataBase64 = Buffer.from((await fileUpload?.arrayBuffer()) || []).toString('base64');
      const payload = { burningCallback, data: dataBase64, accountSender };
      // console.log('TEST createAndSendInscribeRequestTx: prvBalance ', prvBalance);
      console.log('Crreate Inscription payload ===> ', payload);

      try {
        const tx = await accountService.createAndSendInscribeRequestTx({
          ...payload,
        });

        if (!tx) return;

        console.log('TX Create Inscription ', tx);

        const historyData = {
          eventType: 'CREATE',
          txId: tx.txId,
          fileSize: fileUpload?.size,
          fileType: fileUpload?.type,
          txType: tx.txType,
          memo: tx.memo,
          timestamp: Date.now(),
        };

        console.log('TX historyData ', historyData);

        const listHistory1 = await accountService.getInscriptionsHistory({ accountWallet: accountSender });

        console.log('listHistory1 ', listHistory1);

        await accountService.setInscriptionsHistory({ accountWallet: accountSender, historyData });

        const listHistory2 = await accountService.getInscriptionsHistory({ accountWallet: accountSender });

        console.log('listHistory2 ', listHistory2);

        toast.success('Inscribe Successfully!');
        closeModal();
      } catch (error) {
        console.error('------createAndSendInscribeRequestTx------');
        console.log('[createAndSendInscribeRequestTx] ERROR: ', error);
        toast.error(parseError(error));
      } finally {
        closeModal();
      }
    } else {
      setErrorMessage(errorMessage);
      toast.error(errorMessage);
    }
  });

  return (
    <Container>
      <div className="body-container">
        <p className="title">Upload file</p>
        <UploadFileZone {...getRootProps({ isFocused, isDragAccept, isDragReject })}>
          <input {...getInputProps()} />
          {!fileUpload ? (
            // <p className="upload-description">Drag and drop a file here, or click to select files</p>
            <p className="upload-description">Drag and drop a file here</p>
          ) : (
            <>
              <p className="content-file">
                {fileUpload?.name} - {humanFileSize(fileUpload?.size || 0)}
              </p>
              {/* <Trash
                className="trash-icon"
                size={40}
                onClick={() => {
                  console.log('TrashIcon CLICK TODO');
                }}
              /> */}
            </>
          )}
        </UploadFileZone>
        <p className="description">
          <ul>
            <li>{`File's size must be smaller than 1MB`}</li>
            <li>{'Your account must be at least 10PRV.'}</li>
            <li>
              {`Supported file extensions are`} <span>{`jpg, jpeg, png, html, pdf, json.`}</span>
            </li>
          </ul>
          {/* Please note that one zip file can only include one file extension. */}
        </p>
        {!isEnoughtPRVBalance && (
          <div>
            <ErrorMessage>
              {`PRV balance is insufficient. Your PRV balance must be larger than or equal ${format.amountVer2({
                originalAmount: Number(MINIMUM_PRV_BALANCE),
                decimals: prvTokenInfo.pDecimals,
              })} PRV to create the inscription.`}
            </ErrorMessage>
          </div>
        )}

        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        {button.isConnected ? (
          <InscribeNowButton onClick={inscribeNowOnClick}>
            <p className="text">{button.text}</p>
          </InscribeNowButton>
        ) : (
          <InscribeNowButton onClick={_walletAction}>
            {' '}
            <p className="text">{button.text}</p>
          </InscribeNowButton>
        )}
      </div>
    </Container>
  );
};

export default React.memo(CreateInscription);
