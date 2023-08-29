/* eslint-disable react-hooks/rules-of-hooks */
import { InscriptionLoader } from 'components/Core/InscriptionLoader';
import { useModal } from 'components/Modal';
import { WalletState } from 'pages/IncWebWallet/core/types';
import useUnlockWallet from 'pages/IncWebWallet/hooks/useUnlockWalelt';
import useWalletState from 'pages/IncWebWallet/hooks/useWalletState';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getInscriptionInfoAPI, getInscriptionTokenIDsListSelector } from 'state/inscriptions';
import { humanFileSize } from 'utils/fileUtils';
import format from 'utils/format';

import { Inscription } from '../../../state/inscriptions/inscriptions.types';
import InscriptionDetailItem from './components/InscriptionDetailItem';
import { Container, Row, SendButton } from './InscriptionDetail.styles';
import FormSendInscription from './Send/index';

const InscriptionDetail = () => {
  const dispatch = useDispatch();
  const { setModal, closeModal } = useModal();
  const { showUnlockModal } = useUnlockWallet();
  const { walletState, text } = useWalletState();
  const _walletAction = () => showUnlockModal();

  const [inscriptionItem, setInscriptionItem] = useState<Inscription | undefined>(undefined);
  const { tokenId }: any = useParams();

  const myInscriptionTokenIDsList = useSelector(getInscriptionTokenIDsListSelector);

  if (!tokenId) return null;

  const getInscriptionInfo = async () => {
    try {
      const inscriptionInfoList =
        (await dispatch(
          getInscriptionInfoAPI({
            token_ids: [tokenId],
          })
        )) || undefined;
      if (inscriptionInfoList && Array.isArray(inscriptionInfoList) && inscriptionInfoList.length > 0) {
        setInscriptionItem(inscriptionInfoList[0]);
      } else {
        setInscriptionItem(undefined);
      }
    } catch (error) {
      console.log('[getInscriptionInfo] ERROR: ', error);
    }
  };

  useEffect(() => {
    getInscriptionInfo();
  }, []);

  if (!inscriptionItem) return null;

  const sendInscriptionOnClick = () => {
    if (!tokenId) return;
    setModal({
      closable: true,
      data: <FormSendInscription inscriptionId={tokenId} inscription={inscriptionItem} />,
      isTransparent: false,
      rightHeader: undefined,
      title: 'Send Inscription',
      isSearchTokenModal: false,
    });
  };

  const renderSendButton = () => {
    if (walletState === WalletState.uninitialized) return null; //Wallet Null or not created
    if (!myInscriptionTokenIDsList.includes(tokenId)) return null; //This Inscriptions not belong to current User
    if (walletState === WalletState.locked) return <SendButton onClick={_walletAction}>{text}</SendButton>;
    return <SendButton onClick={sendInscriptionOnClick}>Send Inscription</SendButton>;
  };

  return (
    <Container className="default-max-width default-margin-bottom">
      <Row>
        <div className="leftView">
          <div className="thumbInscription-container">
            <div className="wrapper-inscription">
              <InscriptionLoader inscription={inscriptionItem} disbledBlur={true} isInscriptipDetail={true} />
            </div>
          </div>
        </div>

        <div className="rightView">
          <div className="bodyInfo">
            <div className="bodyTitle">
              <p className="header">{`INSCRIPTION #${inscriptionItem.index}`}</p>
            </div>
            <div className="listContent">
              <InscriptionDetailItem title="Token ID:" content={inscriptionItem.token_id} copiable={true} />
              <InscriptionDetailItem title="File Size:" content={humanFileSize(inscriptionItem.size || 0)} />
              <InscriptionDetailItem title="Content Type:" content={inscriptionItem.content_type} />
              <InscriptionDetailItem title="Mint At Block:" content={inscriptionItem.minted_at_block} />
              <InscriptionDetailItem
                title="Mint At:"
                content={format.formatDateTime({ dateTime: inscriptionItem.minted_at * 1000 })}
                isLast={true}
              />
              {renderSendButton()}
            </div>
          </div>
        </div>
      </Row>

      {/* {renderSendButton()} */}
    </Container>
  );
};

export default React.memo(InscriptionDetail);
