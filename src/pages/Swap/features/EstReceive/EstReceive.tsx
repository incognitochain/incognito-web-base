import { BigNumber } from 'bignumber.js';
import Column from 'components/Core/Column';
import Loader from 'components/Core/Loader';
import { InputField } from 'components/Core/ReduxForm';
import { INPUT_FIELD } from 'components/Core/ReduxForm/InputField';
import Row, { RowBetween, RowFlat } from 'components/Core/Row';
import SelectedPrivacy from 'models/model/SelectedPrivacyModel';
import { FORM_CONFIGS } from 'pages/Swap/Swap.constant';
import React from 'react';
import { ChevronDown } from 'react-feather';
import { Field } from 'redux-form';
import styled from 'styled-components/macro';
import { ThemedText } from 'theme';
import format from 'utils/format';

import { FormTypes } from '../FormUnshield/FormUnshield.types';
import SelectSwapExchange, { ISelectSwapExchange } from '../Selection/SelectSwapExchange';

const Styled = styled(Column)<{ isHidden: boolean; isFetching: boolean }>`
  max-height: ${({ isHidden }) => (isHidden ? '0' : '500px')};
  opacity: ${({ isHidden }) => (isHidden ? 0 : 1)};
  visibility: ${({ isHidden }) => (isHidden ? 0 : 1)};
  padding: 0 16px ${({ isHidden }) => (isHidden ? '0' : '15')}px 16px;
  margin-bottom: ${({ isHidden }) => (isHidden ? '0' : '16')}px;
  transition: max-height 0.4s ease-in-out, opacity 0.2s ease-in-out, 0.15s padding ease-out,
    0.15s margin-bottom ease-out;
  margin-top: 16px;
  background-color: ${({ theme }) => theme.primary14};
  border-radius: 8px;
  .wrap-header {
    padding-top: 15px;
  }
  .header-rate {
    :hover {
      opacity: ${({ isFetching }) => (isFetching ? 1 : 0.8)};
    }
  }
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
  minReceiveAmount: string;
  buyToken: SelectedPrivacy;
  sellToken: SelectedPrivacy;
  rate: string;
  networkFee: string;
  burnFeeText: string;
  time: string;

  formType: FormTypes;
  tradePath: string;
  swapFee: any;
  isFetchingFee: boolean;
  desc?: string;
  inputAmount: string;
  impactAmount?: number;
}

const EstReceive = React.memo(
  ({
    minReceiveAmount,
    buyToken,
    sellToken,
    rate,
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
    inputAmount,
    impactAmount,
  }: IProps) => {
    const [isOpen, setOpen] = React.useState(false);
    const [isRateSellToBuy, setIsRateSellToBuy] = React.useState(true);

    const getRateText = () => {
      if (isRateSellToBuy) {
        return ` 1 ${sellToken.symbol} = ${format.amountVer2({
          originalAmount: new BigNumber(rate || 0).toNumber(),
          decimals: 0,
        })} ${buyToken.symbol}`;
      } else {
        return `1 ${buyToken.symbol} = ${format.amountVer2({
          originalAmount: rate ? new BigNumber(1).div(rate || 1).toNumber() : 0,
          decimals: 0,
        })} ${sellToken.symbol}`;
      }
    };

    const renderHeaderTitle = () =>
      formType === FormTypes.SWAP ? (
        <Row
          className="header-rate"
          onClick={(e) => {
            e.stopPropagation();
            if (isFetchingFee) return;
            setIsRateSellToBuy((value) => !value);
          }}
        >
          {rate && (
            <ThemedText.SmallLabel fontWeight={500} color="primary8">
              Rate:
            </ThemedText.SmallLabel>
          )}
          {rate && (
            <ThemedText.SmallLabel fontWeight={500} marginLeft="4px">
              {getRateText()}
            </ThemedText.SmallLabel>
          )}
          {!rate && <ThemedText.SmallLabel fontWeight={500}>Fetching best price...</ThemedText.SmallLabel>}
        </Row>
      ) : (
        <ThemedText.RegularLabel fontWeight={500}>
          {isFetchingFee ? 'Estimating fee ...' : 'Advanced'}
        </ThemedText.RegularLabel>
      );

    const isHidden = !isFetchingFee && (!inputAmount || (formType === FormTypes.SWAP && !rate));
    return (
      <Styled isHidden={isHidden} isFetching={isFetchingFee}>
        <RowBetween style={{ cursor: 'pointer' }} onClick={() => setOpen((isOpen) => !isOpen)}>
          <div className="wrap-header">{renderHeaderTitle()}</div>
          <RowFlat className="wrap-header header-right">
            {!isFetchingFee && formType === FormTypes.SWAP && rate && (
              <Row>
                <ThemedText.SmallLabel fontWeight={500} color="primary8">
                  Fee:
                </ThemedText.SmallLabel>
                <ThemedText.SmallLabel fontWeight={500} marginLeft="4px">
                  <ThemedText.SmallLabel fontWeight={500}>{swapFee?.tradeFeeText}</ThemedText.SmallLabel>
                </ThemedText.SmallLabel>
              </Row>
            )}
            {isFetchingFee ? (
              <Loader stroke="white" size="20px" style={{ marginRight: '40px' }} />
            ) : (
              <RotatingArrow open={isOpen} />
            )}
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
                  <ThemedText.SmallLabel fontWeight={400} color="primary8">
                    Network fee
                  </ThemedText.SmallLabel>
                  <ThemedText.SmallLabel fontWeight={400}>{networkFee}</ThemedText.SmallLabel>
                </RowBetween>
                {!!burnFeeText && (
                  <RowBetween style={{ marginTop: 12 }}>
                    <ThemedText.SmallLabel fontWeight={400} color="primary8">
                      Outchain Fee (est.)
                    </ThemedText.SmallLabel>
                    <ThemedText.SmallLabel fontWeight={400}>{burnFeeText}</ThemedText.SmallLabel>
                  </RowBetween>
                )}
              </>
            ) : null}

            {formType === FormTypes.SWAP && (
              <>
                <RowBetween style={{ marginTop: 12 }}>
                  <ThemedText.SmallLabel fontWeight={400} color="primary8">
                    Minimum received
                  </ThemedText.SmallLabel>
                  <ThemedText.SmallLabel fontWeight={400}>{`${minReceiveAmount || 0} ${
                    buyToken.symbol
                  }`}</ThemedText.SmallLabel>
                </RowBetween>
                {impactAmount !== null && impactAmount !== undefined && (
                  <RowBetween style={{ marginTop: 12 }}>
                    <ThemedText.SmallLabel fontWeight={400} color="primary8">
                      Price impact
                    </ThemedText.SmallLabel>
                    <ThemedText.SmallLabel
                      style={{ color: impactAmount > 15 ? '#F6465D' : impactAmount > 5 ? '#FFC043' : 'white' }}
                      fontWeight={400}
                    >{`${impactAmount}%`}</ThemedText.SmallLabel>
                  </RowBetween>
                )}
              </>
            )}

            <RowBetween style={{ marginTop: 12 }}>
              <ThemedText.SmallLabel fontWeight={400} color="primary8">
                Estimate time
              </ThemedText.SmallLabel>
              <ThemedText.SmallLabel fontWeight={400}>{`${time}`}</ThemedText.SmallLabel>
            </RowBetween>
            {!!desc && (
              <ThemedText.SmallLabel
                color="primary8"
                fontWeight={400}
                marginTop="8px"
              >{`${desc}`}</ThemedText.SmallLabel>
            )}
            {formType === FormTypes.SWAP && tradePath && (
              <RowBetween style={{ marginTop: 12 }}>
                <ThemedText.SmallLabel fontWeight={400} color="primary8">
                  Trade path
                </ThemedText.SmallLabel>
                <ThemedText.SmallLabel fontWeight={400}>{tradePath}</ThemedText.SmallLabel>
              </RowBetween>
            )}
          </Column>
        </ExpandView>
      </Styled>
    );
  }
);

EstReceive.displayName = 'EstReceive';

export default EstReceive;
