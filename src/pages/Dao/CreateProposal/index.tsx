/* eslint-disable react/no-children-prop */
import { notification } from 'antd';
import BackButton from 'components/BackButton';
import { useIncognitoWallet } from 'components/Core/IncognitoWallet/IncongitoWallet.useContext';
import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchProposalFee } from 'services/rpcClient';
import { createProposal } from 'state/dao/operations';
import { Fee, TransactionType } from 'state/dao/types';
import styled from 'styled-components/macro';

import CreateProposalButton from './components/CreateProposalButton';
import { ModalConfirm } from './components/ModalConfirm';
import ProposalForm from './components/ProposalForm';

const MINIMUM_PRV_BALANCE_TO_CREATE_PROPOSAL = 1000;

type NotificationType = 'success' | 'info' | 'warning' | 'error';

const Styled = styled.div`
  textarea.ant-input {
    max-width: 100%;
    min-height: 200px;
  }
`;

const DescriptionContainer = styled.div`
  border: 1px solid #363636;
  border-radius: 16px;
  padding: 24px;
  margin-top: 24px;
`;

const DescriptionText = styled.p`
  font-weight: 500;
  font-size: 16px;
  line-height: 140%;
  color: #9c9c9c;
`;

const FormContainer = styled.div`
  border: 1px solid #363636;
  border-radius: 16px;
  padding: 32px;
  margin-top: 48px;
  align-self: center;
  margin-bottom: 40px;
  width: 100%;
`;

const HeaderTitle = styled.div`
  font-weight: 500;
  font-size: 34px;
  line-height: 140%;
  color: #ffffff;
  margin-left: 16px;
`;

const CreateProposal = () => {
  const [titleValue, setTitleValue] = useState('');
  const [descriptionValue, setDescriptionValue] = useState('');

  const [isFetchingFee, setIsFetchingFee] = useState<boolean>(false);
  const [fee, setFee] = useState<Fee>();

  const [isVisibleModalConfirm, setIsVisibleModalConfirm] = useState<boolean>(false);

  const { requestSignTransaction, isIncognitoInstalled, requestIncognitoAccount } = useIncognitoWallet();

  const handleChangeTitle = useCallback(
    (title: string) => {
      setTitleValue(title);
    },
    [setTitleValue]
  );

  const handleChangeDescription = useCallback(
    (body: string) => {
      setDescriptionValue(body);
    },
    [setDescriptionValue]
  );

  const getFee = async () => {
    try {
      setIsFetchingFee(true);
      const feeResponse: Fee = await fetchProposalFee(1);
      setIsFetchingFee(false);
      setFee(feeResponse);
      setIsVisibleModalConfirm(true);
    } catch (error) {
      setIsFetchingFee(false);
    }
  };

  const [api, contextHolder] = notification.useNotification();

  const showSubmitVotePopupMessage = (type: NotificationType, title: string, message: string) => {
    api[type]({
      message: title,
      description: message,
    });
  };

  const onCreateProposal = () => {
    getFee();
  };

  const dispatch = useDispatch();

  const createProposalRequest = (prvBurnAmount: number) => {
    try {
      dispatch(
        createProposal(
          {
            prvBurnAmount,
            fee,
            description: descriptionValue,
            requestSignTransaction,
            transactionType: TransactionType.CREATE_PROPOSAL,
            title: titleValue,
          },
          (data) => {
            if (data) {
              showSubmitVotePopupMessage('success', 'Success', 'Create proposal success');
            }
          }
        )
      );
    } catch (error) {
      showSubmitVotePopupMessage('error', 'Failed', 'Create proposal failed');
    }
  };

  const isDisabledButton = !titleValue?.trim()?.length || !descriptionValue?.trim()?.length;

  return (
    <Styled>
      {contextHolder}
      <div
        className="default-max-width-2"
        style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
      >
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <BackButton />
          <HeaderTitle>Create Proposal</HeaderTitle>
        </div>
        <DescriptionContainer>
          <DescriptionText>
            Tip: Add one or more proposal actions and describe your proposal for the community. The proposal cannot be
            modified after submission, so please verify all information before submitting. The voting period will begin
            after 2 days and last for 5 days.{'\n\n'}You MUST maintain enough voting power to meet the proposal
            threshold until your proposal is executed. If you fail to do so, anyone can cancel your proposal.
          </DescriptionText>
        </DescriptionContainer>
        <FormContainer>
          <ProposalForm
            title={titleValue}
            description={descriptionValue}
            onChangeTitle={handleChangeTitle}
            onChangeDescription={handleChangeDescription}
          />
          <CreateProposalButton
            isLoading={isFetchingFee}
            disabled={isDisabledButton}
            handleCreateProposal={onCreateProposal}
          />
        </FormContainer>
      </div>
      <ModalConfirm
        onRequestCreateProposal={(prvBurnAmount: number) => {
          createProposalRequest(prvBurnAmount);
          setIsVisibleModalConfirm(false);
        }}
        fee={fee}
        onCancel={() => setIsVisibleModalConfirm(false)}
        isOpen={isVisibleModalConfirm}
      />
    </Styled>
  );
};
export default CreateProposal;
