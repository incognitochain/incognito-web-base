/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import styled, { css } from 'styled-components/macro';
import { MediaQueryBuilder } from 'theme/mediaQuery';

export const Container = styled.div`
  padding: 2rem;
  display: flex;

  border-radius: 24px;
  background-color: ${({ theme }) => theme.color_grey2};

  justify-content: center;
  flex-direction: column;
  align-self: center;

  gap: 0.8rem;

  .title {
    font-weight: 500;
    font-size: 2.5rem;
    line-height: 3rem;
    color: white;
    text-align: center;
  }

  .description {
    font-weight: 400;
    font-size: 1.125rem;
    line-height: 1.75rem;
    color: white;
    text-align: center;
  }

  .inscribe-now {
    padding: 10px 20px;
    display: inline-block;
    position: relative;
    align-items: center;
    background-color: ${({ theme }) => theme.primary2};
    border-radius: 8px;
    align-self: center;

    :hover {
      cursor: pointer;
      opacity: 0.8;
      scale: 1.02;
    }

    .text {
      align-self: center;
      font-weight: 500;
      font-size: 1.125rem;
      line-height: 1.75rem;
      width: max-content;
      white-space: nowrap;
      color: ${({ theme }) => theme.primary5};
    }
  }

  ${MediaQueryBuilder(
    'upToLarge',
    css`
      width: 100%;
    `
  )}
  ${MediaQueryBuilder(
    'upToMedium',
    css`
      width: 100%;
    `
  )}
`;

const MyInscriptionDetail = () => {
  // const dispatch = useDispatch();
  // const history = useHistory();
  React.useEffect(() => {}, []);
  return (
    <Container>
      <p className="title">My Inscriptions</p>
      <p className="description">My Inscriptions Description.</p>
    </Container>
  );
};

export default React.memo(MyInscriptionDetail);
