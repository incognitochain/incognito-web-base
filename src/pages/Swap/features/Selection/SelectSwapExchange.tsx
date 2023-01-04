import curve from 'assets/images/dex/curve.svg';
import incognito from 'assets/images/dex/incognito.svg';
import joe from 'assets/images/dex/joe.svg';
import pancake from 'assets/images/dex/pancake.svg';
import spooky from 'assets/images/dex/spooky.svg';
import uni from 'assets/images/dex/uni.svg';
import trisolaris from 'assets/images/trisolaris-icon.png';
import { InputContainer } from 'components/Core/ReduxForm/InputField/InputField.styled';
import Row from 'components/Core/Row';
import { ExchangeModal, useModal } from 'components/Modal';
import React from 'react';
import { ChevronDown } from 'react-feather';
import styled from 'styled-components/macro';
import { ThemedText } from 'theme';

import { SwapExchange } from '../FormUnshield/FormUnshield.types';

export interface ISelectSwapExchange {
  exchanges: any[];
  onSelectExchange: (exchange: SwapExchange) => void;
  exchangeSelected: any;
}

const ArrowDown = styled(ChevronDown)<{ open?: boolean }>`
  color: ${({ theme }) => theme.primary8};
`;

const ItemStyled = styled(InputContainer)`
  cursor: pointer;
  .active {
    :hover {
      opacity: 0.9;
      transition: 0.2s all ease;
      padding-right: 18px;
      padding-left: 18px;
    }
  }
`;

export const getExchangeLogo = (exchangeSelected: string) => {
  const _exchangeSelected = exchangeSelected.toLowerCase();
  if (_exchangeSelected.includes(SwapExchange.PANCAKE_SWAP)) {
    return pancake;
  } else if (_exchangeSelected.includes(SwapExchange.UNISWAP)) {
    return uni;
  } else if (_exchangeSelected.includes(SwapExchange.CURVE)) {
    return curve;
  } else if (_exchangeSelected.includes(SwapExchange.SPOOKY)) {
    return spooky;
  } else if (_exchangeSelected.includes(SwapExchange.JOE)) {
    return joe;
  } else if (_exchangeSelected.includes(SwapExchange.TRISOLARIS)) {
    return trisolaris;
  } else {
    return incognito;
  }
};

export const formatExchangeName = (exchangeSelected: string) => {
  const _exchangeSelected = exchangeSelected.toLowerCase();
  if (_exchangeSelected.includes(SwapExchange.PDEX)) {
    return 'Incognito Exchange';
  } else {
    return exchangeSelected;
  }
};

export const SelectSwapExchange = React.memo((props: ISelectSwapExchange) => {
  const { onSelectExchange, exchangeSelected, exchanges } = props;
  const { setModal } = useModal();

  const showExchangesModal = () => {
    if (exchanges?.length < 2) return;
    setModal({
      closable: true,
      data: <ExchangeModal exchanges={exchanges} onSelect={onSelectExchange} />,
      isTransparent: false,
      rightHeader: undefined,
      title: 'Select exchange',
    });
  };

  const active = exchanges.length > 1;

  return (
    <div style={{ marginTop: 8, marginBottom: 16 }}>
      <ThemedText.SmallLabel fontWeight={400} color="primary8" marginBottom="4px">
        Exchange
      </ThemedText.SmallLabel>
      <ItemStyled
        onClick={showExchangesModal}
        className={`border-hover input-container input-amount ${active ? 'active' : ''}`}
      >
        <Row>
          <img
            className="logo"
            alt=""
            src={getExchangeLogo(exchangeSelected)}
            style={{ width: 24, height: 24, marginRight: 12 }}
          />
          <ThemedText.RegularLabel fontWeight={500}>{formatExchangeName(exchangeSelected)}</ThemedText.RegularLabel>
        </Row>
        {active && <ArrowDown size={24} />}
      </ItemStyled>
    </div>
  );
});

SelectSwapExchange.displayName = 'SelectSwapExchange';

export default SelectSwapExchange;
