import styled from 'styled-components/macro';
export const Styled = styled.div`
  padding-bottom: 40px;
  width: 100%;
  min-height: 1000px;

  .header-title {
    color: red;
  }
`;

export const WrapperContent = styled.div`
  .sub-menu {
    margin-top: 36px;
    margin-left: auto;
    margin-right: auto;
    width: fit-content;
  }
  .arrow-image {
    width: 12px;
    height: 12px;
  }
  .wrap-item {
    align-items: center;
    cursor: pointer;
    :hover {
      opacity: 0.8;
    }
  }
  .provide-text {
    margin-left: 8px;
    margin-right: 8px;
    color: ${({ theme }) => theme.btn1};
  }
  .watch-item {
    margin-bottom: 20px;
    .h8 {
      margin-left: 8px;
      color: white;
    }
  }
  .header-menu {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    max-width: 360px;
    justify-content: space-around;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 18px;
    div {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      padding: 2px 8px;
      gap: 10px;
      height: 24px;
      background: #303030;
      color: white;
      border-radius: 4px;
      text-transform: uppercase;
      font-weight: 400;
      font-size: 14px;
    }
  }
`;
