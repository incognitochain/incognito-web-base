import styled from 'styled-components/macro';

const Container = styled.div`
  margin-top: 30px;
  min-height: 270px;
  background-color: ${({ theme }) => theme.color_grey1};
  /* background-color: red; */
`;

interface Props {}

const HistoryList = (props: Props) => {
  // const dispatch = useDispatch();
  return <Container></Container>;
};

export default HistoryList;
