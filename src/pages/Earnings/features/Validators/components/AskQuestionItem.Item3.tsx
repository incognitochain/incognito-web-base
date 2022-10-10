import styled from 'styled-components/macro';

const Styled = styled.div`
  display: flex;
  flex-direction: column;
  .read-more {
    margin-top: 15px;
    color: white;
    :hover {
      cursor: pointer;
      opacity: 0.6;
    }
  }
`;

const AskQuestionItem3 = () => {
  return (
    <Styled>
      <h6>Nodes will earn block rewards and transaction fees which is paid in PRV.</h6>
      <div
        className="read-more description"
        onClick={() => {
          window.open('https://we.incognito.org/t/network-incentive-privacy-prv-mining-distribution/172', '_blank');
        }}
      >
        Read more on PRV
      </div>
    </Styled>
  );
};

export default AskQuestionItem3;
