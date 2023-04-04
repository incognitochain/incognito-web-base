import styled from 'styled-components/macro';

interface SettingItemProps {
  onClick?: () => void;
  title?: string;
  description?: string;
}

const SettingItemContainer = styled.div`
  word-wrap: break-word;
  width: 100%;
  padding: 18px 16px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border: 1px solid #363636;
  border-radius: 12px;
  margin-top: 16px;
  :hover {
    cursor: pointer;
    background: #303030;
    border: 1px solid #363636;
  }
`;

const Title = styled.p`
  font-size: 16px;
  color: ${({ theme }) => theme.white};
  align-self: flex-start;
`;

const Description = styled.p`
  font-size: 14px;
  color: #9c9c9c;
  align-self: flex-start;
`;

const SettingItem = (props: SettingItemProps) => {
  const { onClick, title = '', description = '' } = props;

  return (
    <SettingItemContainer onClick={onClick}>
      <Title>{title}</Title>
      <Description>{description}</Description>
    </SettingItemContainer>
  );
};

export default SettingItem;
