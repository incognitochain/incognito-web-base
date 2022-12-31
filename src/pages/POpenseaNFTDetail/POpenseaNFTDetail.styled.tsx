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
    flex: 0.49;
    margin-right: 32px;
    flex-direction: column;

    .content-1 {
      width: 100%;
      margin-bottom: 8px;
    }

    .root-img-nft-1 {
      display: flex;
    }

    .img-nft-1 {
      width: 100%;
      aspect-ratio: 1 / 1;
      background-color: ${({ theme }) => theme.bg4};
      object-fit: cover;
      border-radius: 24px;
    }
  }

  .section-2 {
    flex: 0.49;
    display: flex;
    flex-direction: column;

    .content-2 {
      width: 0%;
    }

    .root-img-nft-2 {
      display: none;
    }

    .img-nft-2 {
      width: 100%;
      aspect-ratio: 1 / 1;
      background-color: ${({ theme }) => theme.bg4};
      object-fit: cover;
      border-radius: 24px;
      background-image: url('assets/images/placeholder.png');
    }
  }

  ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToSmall`
    .content {
      flex-direction: column-reverse;
    }

    .section-1 {
      margin-right: 0px;

      .content-1 {
        width: 0%;
        margin-bottom: 0px;
      }


      .root-img-nft-1 {
        display: none;
      }
    }

    .section-2 {
      margin-top: 16px;

      .content-2 {
        width: 100%;
        margin-bottom: 24px;

      }


    .root-img-nft-2 {
        display: flex;
      }
    }

  `}
`;
