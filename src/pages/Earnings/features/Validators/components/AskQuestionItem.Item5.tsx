import LifeCycleNode from 'assets/images/lifecycle-node.png';
import styled from 'styled-components/macro';

const Styled = styled.div`
  overflow: auto;
  position: relative;
  img {
    height: 200%;
    width: 200%;
    vertical-align: bottom;
  }
`;

const AskQuestionItem5 = () => {
  return (
    <Styled>
      <img src={LifeCycleNode} alt="life-cycle-node" />
    </Styled>
  );
};

export default AskQuestionItem5;
