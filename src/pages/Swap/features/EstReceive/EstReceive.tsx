import Column from 'components/Core/Column';
import Loader from 'components/Core/Loader';
import { InputField } from 'components/Core/ReduxForm';
import { INPUT_FIELD } from 'components/Core/ReduxForm/InputField';
import { RowBetween, RowFlat } from 'components/Core/Row';
import { PRV } from 'constants/token';
import { FORM_CONFIGS } from 'pages/Swap/Swap.constant';
import React from 'react';
import { ChevronDown } from 'react-feather';
import { Field } from 'redux-form';
import { useAppSelector } from 'state/hooks';
import { getPrivacyDataByTokenIDSelector } from 'state/token';
import styled from 'styled-components/macro';
import { ThemedText } from 'theme';

import { FormTypes } from '../FormUnshield/FormUnshield.types';
import SelectSwapExchange, { ISelectSwapExchange } from '../Selection/SelectSwapExchange';

const Styled = styled(Column)`
  background-color: ${({ theme }) => theme.bg4};
  padding: 15px 16px;
  border-radius: 8px;
  .header-right {
    align-items: center;
  }
  a {
    color: ${({ theme }) => theme.blue1};
    display: unset;
    :hover {
      opacity: 0.9;
    }
  }
  .expand-view {
    position: relative;
    overflow: hidden;
    height: 200px;
    transition: height 2s ease;
  }
`;

const RotatingArrow = styled(ChevronDown)<{ open?: boolean }>`
  transform: ${({ open }) => (open ? 'rotate(180deg)' : 'none')};
  transition: transform 0.1s linear;
  margin-left: 9px;
  color: ${({ theme }) => theme.text1};
`;

const ExpandView = styled.div<{ isOpen: boolean }>`
  transition: max-height 0.4s ease-in-out, opacity 0.3s ease-in-out;
  max-height: ${({ isOpen }) => (isOpen ? '500px' : '0')};
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
`;

interface IProps extends ISelectSwapExchange {
  amountText: string;
  symbol: string;
  networkFee: string;
  burnFeeText: string;
  time: string;

  formType: FormTypes;
  tradePath: string;
  swapFee: any;
  isFetchingFee: boolean;
  desc?: string;
}

const EstReceive = React.memo(
  ({
    amountText,
    symbol,
    networkFee,
    burnFeeText,
    time,
    exchanges,
    exchangeSelected,
    onSelectExchange,
    formType,
    tradePath,
    swapFee,
    isFetchingFee,
    desc,
  }: IProps) => {
    const [isOpen, setOpen] = React.useState(false);
    const prvToken = useAppSelector(getPrivacyDataByTokenIDSelector)(PRV.id);
    return (
      <Styled>
        <RowBetween style={{ cursor: 'pointer' }} onClick={() => setOpen((isOpen) => !isOpen)}>
          <ThemedText.SmallLabel fontWeight={400}>Advanced</ThemedText.SmallLabel>
          <RowFlat className="header-right">
            {formType === FormTypes.SWAP && isFetchingFee && (
              <Loader stroke="white" size="20px" style={{ marginRight: '40px' }} />
            )}
            <RotatingArrow open={isOpen} />
          </RowFlat>
        </RowBetween>
        <ExpandView isOpen={isOpen}>
          <Column style={{ marginTop: 14 }}>
            {formType === FormTypes.SWAP && exchanges?.length > 0 && (
              <SelectSwapExchange
                exchanges={exchanges}
                exchangeSelected={exchangeSelected}
                onSelectExchange={onSelectExchange}
              />
            )}
            {formType === FormTypes.SWAP && (
              <>
                <Field
                  component={InputField}
                  name={FORM_CONFIGS.slippage}
                  inputType={INPUT_FIELD.amount}
                  leftTitle="Slippage tolerance (%)"
                  componentProps={{
                    placeholder: 'Percent',
                    type: 'number',
                  }}
                />
              </>
            )}
            {formType === FormTypes.UNSHIELD ? (
              <>
                <RowBetween>
                  <ThemedText.Small fontWeight={400} color="primary8">
                    Network fee
                  </ThemedText.Small>
                  <ThemedText.Small fontWeight={400}>{networkFee}</ThemedText.Small>
                </RowBetween>
                {!!burnFeeText && (
                  <RowBetween style={{ marginTop: 12 }}>
                    <ThemedText.Small fontWeight={400} color="primary8">
                      Outchain Fee (est.)
                    </ThemedText.Small>
                    <ThemedText.Small fontWeight={400}>{burnFeeText}</ThemedText.Small>
                  </RowBetween>
                )}
              </>
            ) : (
              <RowBetween style={{ marginTop: 12 }}>
                <ThemedText.Small fontWeight={400} color="primary8">
                  Fee (est.)
                </ThemedText.Small>
                <ThemedText.Small fontWeight={400}>{swapFee?.tradeFeeText}</ThemedText.Small>
              </RowBetween>
            )}

            <RowBetween style={{ marginTop: 12 }}>
              <ThemedText.Small fontWeight={400} color="primary8">
                Estimate time
              </ThemedText.Small>
              <ThemedText.Small fontWeight={400}>{`${time}`}</ThemedText.Small>
            </RowBetween>
            {!!desc && (
              <ThemedText.Small color="primary8" fontWeight={400} marginTop="8px">{`${desc}`}</ThemedText.Small>
            )}
            {formType === FormTypes.SWAP && tradePath && (
              <RowBetween style={{ marginTop: 12 }}>
                <ThemedText.Small fontWeight={400} color="primary8">
                  Trade path
                </ThemedText.Small>
                <ThemedText.Small fontWeight={400}>{tradePath}</ThemedText.Small>
              </RowBetween>
            )}
            {!prvToken.amount && (
              <ThemedText.Small color="primary8" fontWeight={400} marginTop="12px">
                {`Incognito collects a small network fee of ${networkFee} to pay the miners who help power the network. Get
            some from the `}
                <a className="link" href="https://faucet.incognito.org/" target="_blank" rel="noreferrer">
                  faucet
                </a>
              </ThemedText.Small>
            )}
          </Column>
        </ExpandView>
      </Styled>
    );
  }
);

EstReceive.displayName = 'EstReceive';

export default EstReceive;
