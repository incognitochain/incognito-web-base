import { Button } from 'antd';
import { useIncognitoWallet } from 'components/Core/IncognitoWallet/IncongitoWallet.useContext';
import React from 'react';
import { useSelector } from 'react-redux';
import { incognitoWalletAccountSelector } from 'state/incognitoWallet';
import styled from 'styled-components/macro';

interface CreateProposalButtonProps {
  disabled?: boolean;
  isLoading?: boolean;
  handleCreateProposal?: () => void;
}

const ButtonCreate = styled(Button)`
  height: 60px;
  border-radius: 8px;
  margin-top: 24px;
  border-width: 0px;

  font-weight: 500;
  font-size: 18px;
  line-height: 120%;
  text-align: center;
  color: #ffffff;

  .ant-btn-primary[disabled],
  .ant-btn-primary[disabled]:hover,
  .ant-btn-primary[disabled]:focus,
  .ant-btn-primary[disabled]:active {
    color: #ffffff;
    background: #9c9c9c;
    text-shadow: none;
    box-shadow: none;
  }
`;

const CreateProposalButton: React.FC<CreateProposalButtonProps> = (props) => {
  // eslint-disable-next-line react/prop-types
  const { disabled, isLoading, handleCreateProposal } = props;

  const incAccount = useSelector(incognitoWalletAccountSelector);
  const { isIncognitoInstalled, showPopup } = useIncognitoWallet();

  const getButtonTitle = () => {
    if (incAccount) {
      return 'Create proposal';
    } else {
      if (isIncognitoInstalled()) {
        return 'Connect wallet';
      } else {
        return 'Install wallet';
      }
    }
  };

  const handleClickButton = () => {
    if (incAccount) {
      handleCreateProposal?.();
    } else {
      showPopup();
    }
  };

  return (
    <div>
      <ButtonCreate block disabled={disabled} type="primary" loading={isLoading} onClick={handleClickButton}>
        {getButtonTitle()}
      </ButtonCreate>
    </div>
  );
};

export default CreateProposalButton;
