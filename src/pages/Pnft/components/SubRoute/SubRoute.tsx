import { routePeggingApps } from 'pages';
import { memo } from 'react';
import { useHistory } from 'react-router-dom';
import styled, { DefaultTheme } from 'styled-components/macro';

const Styled = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;

  .sub-title {
    font-weight: 500;
    font-size: 16px;
    text-align: center;
    margin-right: 8px;
    color: ${({ theme }: { theme: DefaultTheme }) => theme.text5};
    line-height: 14px;
  }
  button:hover {
    cursor: pointer;
    color: ${({ theme }: { theme: DefaultTheme }) => theme.text1};
  }
`;

interface IProps {
  collectionSlug: string;
  collectionName: string;
}

const SubRoute = (props: IProps) => {
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
        <p className="sub-title">pNft</p>
      </button>
      <p className="sub-title">/</p>
      <button
        onClick={() => {
          history.push(`/papps/pnft/${props.collectionSlug}`);
        }}
      >
        <p className="sub-title" style={{ color: 'white' }}>
          {props.collectionName}
        </p>
      </button>
    </Styled>
  );
};

export default memo(SubRoute);
