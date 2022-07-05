import { InputField } from 'components/Core/ReduxForm';
import { INPUT_FIELD } from 'components/Core/ReduxForm/InputField';
import { VerticalSpace } from 'components/Core/Space';
import useActiveWeb3React from 'hooks/useActiveWeb3React';
import { useCurrencyBalance } from 'lib/hooks/useTokenBalance';
import { FORM_CONFIGS } from 'pages/Swap/Swap.constant';
import React from 'react';
import { Field } from 'redux-form';
import { useAppSelector } from 'state/hooks';
import styled from 'styled-components/macro';

import { Selection } from '../Selection';
import { depositDataSelector } from './FormDeposit.selectors';

const Styled = styled.div``;

const FormDeposit = React.memo((props: any) => {
  const { handleSubmit } = props;
  const handleDeposit = () => console.log('DEPOSIT');

  const { sellNetworkName, sellToken, sellTokenPoor } = useAppSelector(depositDataSelector);
  const { account } = useActiveWeb3React();
  const balance = useCurrencyBalance(account, sellToken);
  if (balance) {
    console.log('SANG TESTT', balance);
  }

  return (
    <Styled>
      <form onSubmit={handleSubmit(handleDeposit)}>
        <VerticalSpace />
        <Field
          component={InputField}
          name={FORM_CONFIGS.sellAmount}
          inputType={INPUT_FIELD.amount}
          leftTitle="Total amount"
          componentProps={{
            placeholder: 'Amount',
          }}
        />
        <VerticalSpace />
        <Selection title="From" leftValue={sellToken.symbol} rightValue={sellNetworkName} />
        <VerticalSpace />
        <Selection title="To" />
        <VerticalSpace />
        <Field
          component={InputField}
          name={FORM_CONFIGS.formAddress}
          inputType={INPUT_FIELD.address}
          leftTitle="Address"
          componentProps={{
            placeholder: 'Your Address',
          }}
        />
      </form>
    </Styled>
  );
});

FormDeposit.displayName = 'FormDeposit';

export default FormDeposit;
