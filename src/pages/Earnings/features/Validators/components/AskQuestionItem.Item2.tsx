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

const AskQuestionItem2 = () => {
  return (
    <Styled>
      <h6>
        Incomes of a Node consist of 2 parts:
        <br /> - Block rewards: earn by performing consensus work, including verifying transactions and adding new
        blocks.
        <br /> - Transaction fees: earn from the transactions in a specific shard that Node is assigned to.
      </h6>
      <div
        className="read-more description"
        onClick={() => {
          window.open('https://we.incognito.org/t/scaling-blockchain-privacy-with-dynamic-sharding/169', '_blank');
        }}
      >
        Read more on Sharding
      </div>
    </Styled>
  );
};

export default AskQuestionItem2;
