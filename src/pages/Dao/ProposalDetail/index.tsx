/* eslint-disable react/no-children-prop */

import { notification } from 'antd';
import { ButtonConfirmed } from 'components/Core/Button';
import { useIncognitoWallet } from 'components/Core/IncognitoWallet/IncongitoWallet.useContext';
import { PRV } from 'constants/token';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchProposalFee } from 'services/rpcClient';
import { getProposalDetail, vote } from 'state/dao/operations';
import { Fee, Proposal, ProposalStatus } from 'state/dao/types';
import styled, { DefaultTheme } from 'styled-components/macro';
import format from 'utils/format';

import HeaderBox from './components/HeaderBpx';
import InfoBox from './components/InfoBox';
import { ModalVote } from './components/ModalVote';
import ProposalContent from './components/ProposalContent';

const InfoBoxContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;

  ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToMedium`
    flex-direction: column;
  `}
`;

const DescriptionBox = styled.div`
  margin-top: 40px;
`;

type NotificationType = 'success' | 'info' | 'warning' | 'error';

const ProposalDetail = () => {
  const [modalConfirmVisible, setModalConfirmVisible] = useState<boolean>(false);
  const [isFetchingProposalDetail, setIsFetchingProposalDetail] = useState<boolean>(false);
  const [proposalDetail, setProposalDetail] = useState<Proposal>();

  const [selectedVote, setSelectedVote] = useState<1 | 2>(1);

  const [isFetchingFee, setIsFetchingFee] = useState<boolean>(false);
  const [fee, setFee] = useState<Fee>();

  const { requestSignTransaction, isIncognitoInstalled, requestIncognitoAccount } = useIncognitoWallet();

  let { id }: any = useParams();

  const dispatch = useDispatch();

  const getFee = async () => {
    try {
      setIsFetchingFee(true);
      const feeResponse: Fee = await fetchProposalFee();
      setIsFetchingFee(false);
      setFee(feeResponse);
      setModalConfirmVisible(true);
    } catch (error) {
      setIsFetchingFee(false);
    }
  };

  const fetchProposalDetail = async () => {
    try {
      setIsFetchingProposalDetail(true);
      dispatch(
        getProposalDetail(id, (data) => {
          setProposalDetail(data);
          setIsFetchingProposalDetail(false);
        })
      );
    } catch (error) {
      setIsFetchingProposalDetail(false);
    }
  };

  const handleChooseVoteOption = (option: 1 | 2) => {
    setSelectedVote(option);
  };

  const [api, contextHolder] = notification.useNotification();

  const prvVote = format.amountVer2({
    originalAmount: proposalDetail?.quorumVotes || 0,
    decimals: PRV.pDecimals,
  });

  const handleSubmitVote = async (prvBurnAmount: number) => {
    try {
      await dispatch(
        vote(
          {
            title: proposalDetail?.title || '',
            prvBurnAmount,
            fee,
            requestSignTransaction,
            proposalId: proposalDetail?.proposalId || '',
            voteOption: selectedVote,
          },
          (data: any) => {
            if (data) {
              showSubmitVotePopupMessage('success', 'Success', 'Submit vote success');
            }
          }
        )
      );
    } catch (error) {
      showSubmitVotePopupMessage('error', 'Failed', 'Submit vote fail');
    }
  };

  const showSubmitVotePopupMessage = (type: NotificationType, title: string, message: string) => {
    api[type]({
      message: title,
      description: message,
    });
  };

  useEffect(() => {
    fetchProposalDetail();
  }, []);

  const isDisabledButtonVote: boolean = isFetchingProposalDetail || proposalDetail?.status !== ProposalStatus.PENDING;

  return (
    <div className="default-max-width" style={{ width: '100%' }}>
      <>
        {contextHolder}
        <HeaderBox proposal={proposalDetail} isLoading={isFetchingProposalDetail} />
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 24,
            marginTop: 24,
          }}
        >
          <p>Switch to delegate view</p>
          <ButtonConfirmed
            disabled={isDisabledButtonVote}
            onClick={() => getFee()}
            height={'40px'}
            type="submit"
            backgroundColor={'#9C9C9C'}
            style={{ width: 145 }}
          >
            Submit vote
          </ButtonConfirmed>
        </div>

        <InfoBoxContainer>
          <InfoBox
            isLoading={isFetchingProposalDetail}
            leftTitle="Threshold"
            rightTitle="Current Quorum"
            rightValue={`${prvVote} votes`}
          />
          <div style={{ width: 24 }} />
          <InfoBox isLoading={isFetchingProposalDetail} leftTitle="Ends" rightValue={proposalDetail?.endBlock} />
          <div style={{ width: 24 }} />
          <InfoBox
            isLoading={isFetchingProposalDetail}
            leftTitle="Snapshot"
            rightTitle="Taken at block"
            rightValue={proposalDetail?.startBlock || ''}
          />
        </InfoBoxContainer>
        <DescriptionBox>
          <ProposalContent proposal={proposalDetail} isLoading={isFetchingProposalDetail} />
        </DescriptionBox>
        <ModalVote
          isOpen={modalConfirmVisible}
          fee={fee}
          onCancel={() => setModalConfirmVisible(false)}
          onChooseVoteOption={handleChooseVoteOption}
          onSubmitVote={(prvBurnAmount: number) => {
            setModalConfirmVisible(false);
            handleSubmitVote(prvBurnAmount);
          }}
          selectedVote={selectedVote}
        />
      </>
    </div>
  );
};
export default ProposalDetail;
