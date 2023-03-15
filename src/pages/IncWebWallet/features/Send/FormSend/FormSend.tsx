// export { default as FormSend } from './FormSend';
// export { default as reducer } from './FormSend.reducer';
import { ButtonConfirmed } from 'components/Core/Button';
import { INPUT_FIELD } from 'components/Core/ReduxForm/InputField';
import { SelectionSendField } from 'components/Core/ReduxForm/SelectionSendField';
import { Field } from 'redux-form';
import styled from 'styled-components/macro';

import { FORM_CONFIGS } from './FormSend.constant';
import { default as enhance } from './FormSend.enhance';

const Container = styled.div`
  display: flex;
  min-height: 300px;
  flex-direction: column;
`;

const VerticalSpace = styled.div`
  height: 25px;
`;

interface Props {}

const FormSend = (props: Props & any) => {
  console.log('FormSend props ', props);
  const {
    formatAmount = '0.00',
    symbol,
    handleSubmit,
    validateAmount,
    validateAddress,
    onAmountMaxClicked,
    openAddressBook,
  } = props;
  const onSend = (data: any) => {
    console.log('TO DO onSend ', data);
  };

  return (
    <Container>
      <form onSubmit={handleSubmit(onSend)}>
        <Field
          component={SelectionSendField}
          name={FORM_CONFIGS.amount}
          inputType={INPUT_FIELD.amount}
          placeholder="0.00"
          headerTitle="From"
          componentProps={{
            type: 'number',
          }}
          amount={formatAmount}
          tokenSymbol={symbol}
          validate={validateAmount}
          onClickFooterRight={() => {}}
          maxButtonOnClick={() => {
            console.log('maxButtonOnClick  TO DO ');
            onAmountMaxClicked && onAmountMaxClicked();
          }}
        />
        <VerticalSpace />
        <Field
          component={SelectionSendField}
          name={FORM_CONFIGS.toAddress}
          inputType={INPUT_FIELD.address}
          headerTitle="To"
          placeholder="Incognito Address"
          componentProps={{
            type: 'text',
          }}
          validate={validateAddress}
          selectPaymentAddressButtonOnClick={() => {
            console.log('selectPaymentAddressButtonOnClick  TO DO ');
            openAddressBook && openAddressBook();
          }}
        />
        <VerticalSpace />
        <Field
          component={SelectionSendField}
          name={FORM_CONFIGS.memo}
          inputType={INPUT_FIELD.string}
          headerTitle="Memo"
          placeholder="memo"
          componentProps={{
            type: 'text',
          }}
          validate={[]}
          showShowTopUp={true}
        />
        <VerticalSpace />
        <Field
          component={SelectionSendField}
          name={FORM_CONFIGS.fee}
          inputType={INPUT_FIELD.string}
          headerTitle="Network Fee"
          placeholder="0.1"
          disabled={true}
          componentProps={{
            type: 'text',
          }}
          feeSymbol={'PRV'}
          validate={[]}
          showShowTopUp={true}
        />
        <VerticalSpace />
        <VerticalSpace />
        <ButtonConfirmed height={'50px'} type="submit">
          {'Send Anonymously'}
        </ButtonConfirmed>
      </form>
    </Container>
  );
};

export default enhance(FormSend);
