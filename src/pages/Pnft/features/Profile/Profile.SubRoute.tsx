import { routePeggingApps } from 'pages';
import { memo } from 'react';
import { useHistory } from 'react-router-dom';
import styled, { DefaultTheme } from 'styled-components/macro';

const Styled = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;

  .sub-title {
    color: ${({ theme }: { theme: DefaultTheme }) => theme.text5};
    font-weight: 400;
    font-size: 14px;
    letter-spacing: 0.01em;
    text-align: center;
    margin-right: 8px;
  }
  button:hover {
    cursor: pointer;
    color: ${({ theme }: { theme: DefaultTheme }) => theme.text1};
  }
`;

interface IProps {}

const ProfileSubRoute = (props: IProps) => {
  const history = useHistory();
  return (
    <Styled className="sub-route">
      <button
        className="hover"
        onClick={() => {
          history.push(routePeggingApps);
        }}
      >
        <p className="sub-title">Use</p>
      </button>
      <p className="sub-title">/</p>

      <button
        className="hover"
        onClick={() => {
          history.push('/papps/pnft');
        }}
      >
        <p className="sub-title">pNFT</p>
      </button>
      <p className="sub-title">/</p>
      <button>
        <p className="sub-title" style={{ color: 'white' }}>
          Portfolio
        </p>
      </button>
    </Styled>
  );
};

export default memo(ProfileSubRoute);
