import styled from 'styled-components/macro';

const InfoStyled = styled.div`
  margin-bottom: 24px;
  .titleView {
    display: flex;
    flex-direction: column;
    .title-container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      .title-custom {
        text-align: center;
        align-self: center;
        font-weight: 700;
      }
      .description-custom {
        width: 60%;
        margin-top: 24px;
        text-align: center;
        align-self: center;
        color: ${({ theme }) => theme.color_grey};
      }
    }
  }
`;

const ListStyled = styled.div`
  min-height: 90vh;
`;

const Container = styled.div`
  padding-bottom: 40px;
  width: 100%;
  min-height: 1000px;
`;

export { Container, InfoStyled, ListStyled };
