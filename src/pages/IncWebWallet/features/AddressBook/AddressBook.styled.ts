import styled from 'styled-components/macro';

const Container = styled.div``;

const AddressBookItemStyled = styled.div`
  width: 100%;
  margin-bottom: 16px;
  padding: 14px 4px;
  border-radius: 8px;
  display: flex;
  flex-direction: row;
  background-color: ${({ theme }) => theme.bg1};
  .left-view {
    display: flex;
    width: 100%;
    flex-direction: column;
    justify-content: center;
    margin-left: 16px;
  }
  .right-view {
    position: absolute;
    align-self: center;
    right: 40px;
  }
  .title {
    color: ${({ theme }) => theme.bg1};
    text-align: start;
  }
  .desc {
    color: ${({ theme }) => theme.bg1};
    max-lines: 1;
    overflow: hidden;
    text-overflow: clip ellipsis;
    text-align: start;
  }
`;

export { AddressBookItemStyled, Container };
