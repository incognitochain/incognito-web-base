import { InputContainer } from 'components/Core/ReduxForm/InputField/InputField.styled';
import { ExchangeModal, useModal } from 'components/Modal';
import React from 'react';
import { ThemedText } from 'theme';

import { SwapExchange } from '../FormUnshield/FormUnshield.types';

export interface ISelectSwapExchange {
  exchanges: any[];
  onSelectExchange: (exchange: SwapExchange) => void;
  exchangeSelected: any;
}

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

  return (
    <div style={{ marginTop: 8, marginBottom: 16 }}>
      <ThemedText.SmallLabel fontWeight={400} color="primary8">
        Exchange
      </ThemedText.SmallLabel>
      <InputContainer onClick={showExchangesModal} className="border-hover input-container input-amount">
        <p>{exchangeSelected}</p>
      </InputContainer>
    </div>
  );
});

SelectSwapExchange.displayName = 'SelectSwapExchange';

export default SelectSwapExchange;
