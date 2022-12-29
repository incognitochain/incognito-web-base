import styled, { DefaultTheme } from 'styled-components/macro';
export const Styled = styled.div`
  padding-bottom: 40px;
  width: 100%;
`;

export const WrapperContent = styled.div`
  width: 100%;

  .content {
    display: flex;
    flex: 1;
    flex-direction: row;
    margin-top: 16px;
  }
  .section-1 {
    display: flex;
    flex: 0.52;
    margin-right: 32px;
    flex-direction: column;

    .content-1 {
      width: 100%;
    }

    .img-nft {
      width: 100%;
      aspect-ratio: 1 / 1;
      background-color: ${({ theme }) => theme.bg4};
      object-fit: cover;
      border-radius: 24px;
      background-image: url('assets/images/placeholder.png');
    }
  }

  .section-2 {
    flex: 0.46;
    display: flex;
    flex-direction: column;

    .collection-container {
      display: flex;
      flex-direction: row;
      align-items: center;
    }
    .collection-name {
      font-weight: 400;
      font-size: 16px;
      line-height: 140%;
      color: ${({ theme }) => theme.color_blue};
      margin-right: 8px;
      cursor: pointer;
    }

    .name {
      font-weight: 700;
      font-size: 34px;
      line-height: 140%;
      margin-top: 8px;
    }

    .owner-by {
      font-weight: 400;
      font-size: 16px;
      line-height: 140%;
      margin-top: 4px;
    }

    .view-container {
      display: flex;
      flex-direction: row;
      margin-top: 24px;
    }
  }

  ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToSmall`
    .content {
      flex-direction: column;
    }

    .section-2 {
      margin-top: 16px;

    }

  `}
`;
