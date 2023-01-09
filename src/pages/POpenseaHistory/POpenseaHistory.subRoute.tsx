import { routePeggingApps } from 'pages';
import { memo } from 'react';
import { useHistory } from 'react-router-dom';
import styled, { DefaultTheme } from 'styled-components/macro';

const Styled = styled.div`
  display: flex;
  /* margin-top: 20px; */
  flex-direction: row;
  width: 100%;

  .sub-title {
    font-weight: 400;
    font-size: 14px;
    letter-spacing: 0.01em;
    text-align: center;
    margin-right: 8px;
  }

  .earnings-text {
    color: ${({ theme }: { theme: DefaultTheme }) => theme.text5};
  }

  button:hover {
    cursor: pointer;
    color: ${({ theme }: { theme: DefaultTheme }) => theme.text1};
  }
`;

const POpenseaHistorySubRoute = () => {
  const history = useHistory();
  return (
    <Styled>
      <button
        className="hover"
        onClick={() => {
          history.push(routePeggingApps);
        }}
      >
        <p className="sub-title earnings-text">Use</p>
      </button>
      <p className="sub-title">/</p>

      <button
        className="hover"
        onClick={() => {
          history.push('/papps/popensea');
        }}
      >
        <p className="sub-title earnings-text">pOpensea</p>
      </button>
      <p className="sub-title">/</p>
      <button>
        <p className="sub-title">history</p>
      </button>
    </Styled>
  );
};

export default memo(POpenseaHistorySubRoute);
