import { renderHeader, renderItem, tokenCollectionSelector } from 'pages/Blur';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components/macro';

const Container = styled.div<{ expand: boolean }>`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: -35px;
  margin-bottom: 32px;
  padding-bottom: 12px;
  border-bottom: 1px solid ${({ theme }) => theme.bg3};

  @keyframes ShowDown {
    0% {
      margin-top: -150px;
      opacity: 0;
    }
    100% {
      margin-top: -35px;
      opacity: 1;
    }
  }
  animation-duration: 1s;
  animation-name: ${({ expand }) => (expand ? 'ShowDown' : '')};

  .wrap-item {
  }
  .wrap-header {
  }
  .wrap-name .name {
    width: 100px !important;
  }
  .wrap-name .header-name {
    width: 100px !important;
  }
  div {
    cursor: unset;
    :hover {
      background-color: transparent;
    }
  }
  .collection-item {
    padding: 12px 0;
  }
`;

const Header = () => {
  const collection = useSelector(tokenCollectionSelector);
  const history = useHistory();
  if (!collection) return <div />;
  return (
    <Container expand={!!collection}>
      {!!collection && renderHeader({ removeIndex: true })}
      {!!collection && renderItem({ collection, index: 0, history, removeIndex: true })}
    </Container>
  );
};

export default Header;
