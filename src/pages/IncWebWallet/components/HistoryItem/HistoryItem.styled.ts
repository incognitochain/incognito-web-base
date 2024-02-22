import styled from 'styled-components/macro';

export const Styled = styled.div`
  .history-tx-item {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 15px;
    justify-content: space-between;
  }
  .history-tx-item label {
    flex-basis: 30%;
  }
  .history-tx-item .hook {
    position: relative;
    flex-basis: 65%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .history-tx-item .hook span {
    max-width: 175px;
  }
  .toggle-message {
    cursor: pointer;
  }
  .toggle-message .icon {
    height: 10px;
  }
  .message {
    margin-bottom: 15px;
  }
  .arrow-icon {
    right: 0;
  }
  .message > a {
    color: ${({ theme }) => '#9C9C9C'};
    display: inline;
    text-decoration-line: underline;
  }
  .title {
    color: ${({ theme }) => '#FFFFFF'};
  }
`;
