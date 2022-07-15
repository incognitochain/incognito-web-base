import { ReactComponent as Image404 } from 'assets/svg/404-image.svg';
import styled from 'styled-components/macro';
import { ThemedText } from 'theme';
export const Styled = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 1rem;
  align-items: center;
  flex: 1;
  z-index: 1;

  .button {
    all: unset;
    align-items: center;
    justify-content: center;
    padding: 14px 24px;
    gap: 10px;

    background-color: ${({ theme }) => theme.primary2};
    border-radius: 8px;
    max-height: 40px;
    font-weight: 500;
    font-size: 16px;
    line-height: 140%;
    text-align: center;
    width: 90px;
  }

  .icon-wrapper {
    margin-bottom: 40px;
  }

  .description-wrapper {
    max-width: 370px;
    margin-top: 8px;
    margin-bottom: 40px;
    text-align: center;
  }
`;

const PageNotFound = () => {
  return (
    <Styled>
      <Image404 className="icon-wrapper" />
      <ThemedText.LargeHeader color="primary5">{'Page not found'}</ThemedText.LargeHeader>

      <ThemedText.RegularLabel fontWeight={400} color="primary8" className="description-wrapper">
        {'This page doesn’t exist or was removed or perhaps it was stolen'}
      </ThemedText.RegularLabel>

      <button
        className="button button-hover"
        onClick={() => {
          console.log('Go back TO DO');
        }}
      >
        Go back
      </button>
    </Styled>
  );
};

export default PageNotFound;
