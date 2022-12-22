import { routePeggingApps } from 'pages';
import { memo } from 'react';
import { useHistory } from 'react-router-dom';
import styled, { DefaultTheme } from 'styled-components/macro';
const Styled = styled.div`
  display: flex;
  /* margin-top: 20px; */
  margin-bottom: 60px;
  flex-direction: row;

  .sub-title {
    font-weight: 500;
    font-size: 16px;
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

const POpenseaSubRoute = () => {
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
        onClick={() => {
          history.push('/popensea');
        }}
      >
        <p className="sub-title">pOpensea</p>
      </button>
    </Styled>
  );
};

export default memo(POpenseaSubRoute);
