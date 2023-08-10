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
import React, { useEffect, useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useHistory } from 'react-router-dom';
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
import { MAXIMUM_FILE_SIZE, MINIMUM_PRV_BALANCE, SUPPORTED_FILE_EXTENSIONS } from './CreateInscription.constants';
import { Container, ErrorMessage, InscribeNowButton, Row, UploadFileZone } from './CreateInscription.styles';

export const formatAmount = (price?: string, canEmpty = false, decimals = 9): string => {
  let result = '';

  if (!price || price.length < 1) {
    if (canEmpty) return '--';
    else {
      return '0.0';
    }
  }
  const indexNumberBN = new BigNumber(10).pow(decimals).toNumber();
  const priceBigNumber = new BigNumber(price || '0.0');

  result = priceBigNumber.div(indexNumberBN).decimalPlaces(2).toFixed() || '0.0';

  return result;
};

const CreateInscription = () => {
  const { showUnlockModal } = useUnlockWallet();
  const history = useHistory();
  const incAccount = useAppSelector(incognitoWalletAccountSelector);
  const webWalletState = useAppSelector(webWalletStateSelector);
  const { isIncognitoInstalled } = useIncognitoWallet();
  const { setModal, closeModal } = useModal();

  const walletController = useWalletController();
  const prvTokenInfo = useAppSelector(getPrivacyDataByTokenIDSelector)(PRV.id);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
  const accountSender = useAppSelector(defaultAccountWalletSelector);

  // const dispatch = useDispatch();
  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject, acceptedFiles, fileRejections } =
    useDropzone({
      accept: SUPPORTED_FILE_EXTENSIONS,
      maxFiles: 1,
      multiple: false,
      maxSize: MAXIMUM_FILE_SIZE,
    });

  const _walletAction = () => showUnlockModal();

  const prvBalance = useMemo(() => {
    return new BigNumber(prvTokenInfo?.amount || 0);
  }, [prvTokenInfo]);

  const errorRejection = useMemo(() => {
    if (!fileRejections || fileRejections.length < 1) return undefined;
    let errorMessage = '';
    const file = fileRejections[0];
    const errorCode = file.errors[0].code;
    if (errorCode === 'file-too-large') {
      errorMessage = `File too large. File's size must be smaller than ${humanFileSize(MAXIMUM_FILE_SIZE)}`;
    } else {
      if (errorCode === 'file-invalid-type') {
        errorMessage = 'File invalid type';
      } else {
        errorMessage = 'Something went wrong';
      }
    }
    return errorMessage;
  }, [fileRejections]);

  useEffect(() => {
    setErrorMessage(errorRejection);
  }, [errorRejection]);

  const fileUpload = useMemo(() => {
    return acceptedFiles && acceptedFiles.length > 0 ? acceptedFiles[0] : undefined;
  }, [acceptedFiles]);

  const { estimateFee, estimateFeeStr } = useMemo(() => {
    if (!fileUpload)
      return {
        estimateFee: 0,
        estimateFeeStr: '0',
      };
    const currentFileSize = fileUpload.size;
    const buffer = 5 * 1024; // = 5 KB
    const totalSize = currentFileSize + buffer;
    const fee = (totalSize / 1024) * 1e9;

    return {
      estimateFee: fee || 0,
      estimateFeeStr: formatAmount(fee.toString(), false, 9),
    };
  }, [fileUpload]);

  const totalFileSize = useMemo(() => {
    let totalSize = 0;
    acceptedFiles.map((file) => (totalSize += file.size || 0));
    return totalSize;
  }, [acceptedFiles]);

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

  const { isEnoughtPRVBalance, prvRequiredStr } = useMemo(() => {
    let isEnoughtPRVBalance = true;
    let prvRequiredStr = '';

    const maxPRVrequired = BigNumber.maximum(MINIMUM_PRV_BALANCE, estimateFee).toNumber();

    if (prvBalance.isLessThan(new BigNumber(maxPRVrequired))) {
      isEnoughtPRVBalance = false;
      prvRequiredStr = format.amountVer2({
        originalAmount: maxPRVrequired || 0,
        decimals: prvTokenInfo.pDecimals || 9,
      });
    }

    return {
      isEnoughtPRVBalance,
      prvRequiredStr,
    };
  }, [prvBalance, prvTokenInfo, fileUpload, estimateFee]);

  const checkValidate = () => {
    let errorMessage = 'Something went wrong';
    let isValidate = true;
    if (!fileUpload) {
      errorMessage = `File is Required`;
      isValidate = false;
    } else {
      // Check MAXIMUM file's size;
      if (totalFileSize > MAXIMUM_FILE_SIZE) {
        errorMessage = `File's size must be smaller than ${humanFileSize(MAXIMUM_FILE_SIZE)}`;
        isValidate = false;
      }
    }

    return {
      isValidate,
      errorMessage,
    };
  };

  const inscribeNowOnClick = useThrottle(async () => {
    if (!isEnoughtPRVBalance || errorMessage) return;

    const { isValidate, errorMessage: errorMessageValidate } = checkValidate();
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

        await accountService.setInscriptionsHistory({ accountWallet: accountSender, historyData });

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
      setErrorMessage(errorMessageValidate);
      toast.error(errorMessageValidate);
    }
  });

  const renderRowDescription = (title: any, content: any, color?: string, bold?: string) => {
    return (
      <Row>
        <p className="label">{title || ''}</p>
        <p className={`content ${color ? color : ''} ${bold ? bold : ''}`}>{content || ''}</p>
      </Row>
    );
  };

  return (
    <Container>
      <div className="body-container">
        <p className="title">Upload file</p>
        <UploadFileZone {...getRootProps({ isFocused, isDragAccept, isDragReject })}>
          <input {...getInputProps()} />
          {!fileUpload ? (
            <p className="upload-description">Drag and drop a file here</p>
          ) : (
            <>
              <p className="content-file">
                {fileUpload?.name} - {humanFileSize(fileUpload?.size || 0)}
              </p>
            </>
          )}
        </UploadFileZone>
        {/* <p className="description">
          <ul>
            <li>{`File's size must be smaller than ${humanFileSize(MAXIMUM_FILE_SIZE)}`}</li>
            <li>{'Your account must be at least 10 PRV.'}</li>
            <li>
              {`Supported file extensions are`} <span>{`jpg, jpeg, png, html, pdf, json.`}</span>
            </li>
          </ul>
        </p> */}

        {renderRowDescription('Supported file extensions:', `jpg, jpeg, png, html, pdf, json`, 'blue')}
        {renderRowDescription(`Maximum file's size:`, `${humanFileSize(MAXIMUM_FILE_SIZE)}`)}
        {/* {renderRowDescription(`Minimum PRV Balance:`, `10 PRV`)} */}
        {renderRowDescription('Your PRV Balance:', `${prvTokenInfo.formatAmount || 0} PRV`)}
        {fileUpload &&
          estimateFee &&
          renderRowDescription('Estimate Fee: ', `${estimateFeeStr} PRV`, undefined, 'bold')}

        {!isEnoughtPRVBalance && webWalletState === WalletState.unlocked && (
          <div>
            <ErrorMessage>
              {`PRV balance is insufficient. Your PRV balance must be larger than or equal ${prvRequiredStr} PRV to create the inscription.`}
              <span
                onClick={() => {
                  history.push('/swap');
                }}
              >
                Topup now
              </span>
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
