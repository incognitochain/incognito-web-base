import BigNumber from 'bignumber.js';
import AppButton from 'components/AppButton';
import { useModal } from 'components/Modal';
import LoadingTransaction from 'components/Modal/Modal.transaction';
import { PRV } from 'constants/token';
import useThrottle from 'hooks/useThrottle';
import { WalletState } from 'pages/IncWebWallet/core/types';
import IcArrowLeft from 'pages/IncWebWallet/images/ic_arrow_left.svg';
import accountService from 'pages/IncWebWallet/services/wallet/accountService';
import { RoutePaths } from 'pages/Routes';
import React, { useEffect, useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { defaultAccountWalletSelector } from 'state/account/account.selectors';
import { useAppSelector } from 'state/hooks';
import { setFilterPage } from 'state/inscriptions';
import { webWalletStateSelector } from 'state/masterKey';
import { getPrivacyDataByTokenIDSelector } from 'state/token';
import { parseError } from 'utils/errorHelper';
// import { Trash } from 'react-feather';
import { humanFileSize } from 'utils/fileUtils';

import { MAXIMUM_FILE_SIZE, MINIMUM_PRV_BALANCE, SUPPORTED_FILE_EXTENSIONS } from './CreateInscription.constants';
import { Container, ErrorMessage, LeftContainer, Row, UploadFileZone } from './CreateInscription.styles';

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
  const history = useHistory();
  const dispatch = useDispatch();
  const webWalletState = useAppSelector(webWalletStateSelector);
  const { setModal, closeModal } = useModal();

  const prvTokenInfo = useAppSelector(getPrivacyDataByTokenIDSelector)(PRV.id);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
  const accountSender = useAppSelector(defaultAccountWalletSelector);

  const goBack = () => {
    history.push(RoutePaths.INSCRIPTIONS);
  };
  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject, acceptedFiles, fileRejections } =
    useDropzone({
      accept: SUPPORTED_FILE_EXTENSIONS,
      maxFiles: 1,
      multiple: false,
      maxSize: MAXIMUM_FILE_SIZE,
    });

  const prvBalance = useMemo(() => {
    return new BigNumber(prvTokenInfo?.amount || 0);
  }, [prvTokenInfo]);

  const errorRejection = useMemo(() => {
    if (!fileRejections || fileRejections.length < 1) return undefined;
    let errorMessage = '';
    const file = fileRejections[0];
    const errorCode = file.errors[0].code;
    if (errorCode === 'file-too-large') {
      errorMessage = `File too large. File size must be smaller than ${humanFileSize(MAXIMUM_FILE_SIZE)}`;
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
    const estimateFeeTmp = (totalSize / 1024) * 1e9;
    const fee = BigNumber.maximum(MINIMUM_PRV_BALANCE, estimateFeeTmp).toNumber();

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

  const { isEnoughtPRVBalance, prvRequiredStr } = useMemo(() => {
    let isEnoughtPRVBalance = true;
    let prvRequiredStr = '';

    const maxPRVrequired = BigNumber.maximum(MINIMUM_PRV_BALANCE, estimateFee).toNumber();

    if (prvBalance.isLessThan(new BigNumber(maxPRVrequired))) {
      isEnoughtPRVBalance = false;
      prvRequiredStr = formatAmount(maxPRVrequired.toString(), false, 9);
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
        toast.success('Inscribe successfully. Please wait for up to 3 minutes for your inscription to appear.', {
          autoClose: 3000,
        });
        closeModal();

        //Navigate to My Inscirpiton Page
        goBack();
        dispatch(setFilterPage('My Inscriptions'));
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
    <Container className="default-max-width default-margin-bottom">
      <LeftContainer
        onClick={() => {
          goBack();
        }}
      >
        <img alt="ic-arrow-left" src={IcArrowLeft} />
      </LeftContainer>
      <div className="body-container">
        <p className="title">Upload File</p>
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
        {renderRowDescription(`Maximum file size:`, `${humanFileSize(MAXIMUM_FILE_SIZE)}`)}
        {/* {renderRowDescription(`Minimum PRV Balance:`, `10 PRV`)} */}
        {renderRowDescription('Your PRV Balance:', `${prvTokenInfo.formatAmount || 0} PRV`)}
        {fileUpload &&
          estimateFee &&
          renderRowDescription('Estimate Fee: ', `${estimateFeeStr} PRV`, undefined, 'bold')}

        {!isEnoughtPRVBalance && webWalletState === WalletState.unlocked && (
          <div>
            <ErrorMessage>
              {`Your PRV balance must be greater than or equal to ${prvRequiredStr}PRV to inscribe an inscription.`}
              <span
                onClick={() => {
                  history.push('/swap');
                }}
              >
                {'Top up now'}
              </span>
            </ErrorMessage>
          </div>
        )}

        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        <AppButton title="Inscribe" onClickCallback={inscribeNowOnClick}></AppButton>
      </div>
    </Container>
  );
};

export default React.memo(CreateInscription);
