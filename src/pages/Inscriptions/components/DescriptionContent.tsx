/* eslint-disable react-hooks/rules-of-hooks */
import AppButton from 'components/AppButton';
import { RoutePaths } from 'pages/Routes';
import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
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

  .row {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 1rem;

    .inscribe-now {
      flex-wrap: wrap;
      padding: 10px 20px;
      background-color: ${({ theme }) => theme.primary2};
      border-radius: 8px;
      flex-basis: fit-content;

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

const InscriptionDetail = () => {
  const history = useHistory();
  const inscribeNowOnClick = useCallback(() => {
    history.push(RoutePaths.CREATE_INSCRIPTION);
  }, []);

  return (
    <Container>
      <p className="title">{'Privacy Inscriptions'}</p>
      <p className="description">{`Empowering Your Data’s Privacy`}</p>

      <div className="row">
        <AppButton title="Inscribe" onClickCallback={inscribeNowOnClick}></AppButton>
      </div>
    </Container>
  );
};

export default React.memo(InscriptionDetail);
