import { Space } from 'components/Core';
import { ButtonConfirmed } from 'components/Core/Button';
import { INPUT_FIELD } from 'components/Core/ReduxForm/InputField';
import { SelectionSendField } from 'components/Core/ReduxForm/SelectionSendField';
import { Field } from 'redux-form';
import styled from 'styled-components/macro';

import { FORM_CONFIGS } from './FormSend.constant';
import { default as enhance } from './FormSend.enhance';
import { getNetworkFee } from './FormSend.utils';

const Container = styled.div`
  display: flex;
  min-height: 300px;
  flex-direction: column;
`;

interface Props {}

const FormSend = (props: Props & any) => {
  const {
    formatAmount = '0.00',
    symbol,
    handleSubmit,
    validateAmount,
    validateAddress,
    onAmountMaxClicked,
    openAddressBook,
    handleSendAnonymously,
    sendBtnDisable,
  } = props;

  return (
    <Container>
      <form onSubmit={handleSubmit(handleSendAnonymously)}>
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
            onAmountMaxClicked && onAmountMaxClicked();
          }}
        />
        <Space.Vertical size={25} />
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
            openAddressBook && openAddressBook();
          }}
        />
        <Space.Vertical size={25} />
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
        />
        <Space.Vertical size={25} />
        <Field
          component={SelectionSendField}
          name={FORM_CONFIGS.fee}
          inputType={INPUT_FIELD.string}
          headerTitle="Network Fee"
          placeholder={getNetworkFee()}
          disabled={true}
          componentProps={{
            type: 'text',
          }}
          feeSymbol={'PRV'}
          validate={[]}
          showShowTopUp={true}
        />
        <Space.Vertical size={50} />
        <ButtonConfirmed height={'50px'} type="submit" disabled={sendBtnDisable}>
          {'Send Anonymously'}
        </ButtonConfirmed>
      </form>
    </Container>
  );
};

export default enhance(FormSend);
