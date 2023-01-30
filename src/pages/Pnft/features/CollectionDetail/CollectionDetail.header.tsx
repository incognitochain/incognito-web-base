import { renderHeader, renderItem, tokenCollectionSelector } from 'pages/Pnft';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components/macro';

const Container = styled.div<{ expand: boolean }>`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 0;
  margin-bottom: 32px;
  padding-bottom: 12px;
  border-bottom: 1px solid ${({ theme }) => theme.bg3};

  @keyframes ShowDown {
    0% {
      margin-top: -100px;
      opacity: 0;
    }
    100% {
      //margin-top: 0;
      opacity: 1;
      margin-top: 0;
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
