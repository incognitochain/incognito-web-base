import SelectPaymentIconSrc from 'assets/svg/ic-select-payment-address.svg';
import { Space, Typography } from 'components/Core';
import { ButtonConfirmed } from 'components/Core/Button';
import { FormField as FieldDecorator } from 'components/Core/ReduxForm';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Field, WrappedFieldProps } from 'redux-form';
import { getPRVBalanceInfo } from 'state/account/account.selectors';
import styled from 'styled-components/macro';

import { FORM_CONFIGS } from './FormSend.constant';
import { default as enhance } from './FormSend.enhance';
import ErrorView from './FormSend.errorView';
import { getNetworkFee } from './FormSend.utils';

const Container = styled.div`
  display: flex;
  min-height: 300px;
  flex-direction: column;
`;

interface Props {}

const FormSend = (props: Props & any) => {
  const { handleSubmit, validateAddress, openAddressBook, handleSendInscription, sendBtnDisable } = props;

  const { isEnoughPRVNetworkFee } = useSelector(getPRVBalanceInfo) as any;

  const renderAddressField = useCallback((props: WrappedFieldProps) => {
    return (
      <FieldDecorator>
        <FieldDecorator.Header leftTitle="To" />
        <FieldDecorator.Body
          leftView={<FieldDecorator.Input input={props.input} type="text" placeholder="Incognito Address" />}
          rightView={
            <div
              key="info"
              className="hover-opacity center"
              onClick={() => {
                openAddressBook && openAddressBook();
              }}
            >
              <img alt="ic-select-payment-address" src={SelectPaymentIconSrc} />
            </div>
          }
          {...props}
        />
      </FieldDecorator>
    );
  }, []);

  const renderMemoField = useCallback((props: WrappedFieldProps) => {
    return (
      <FieldDecorator>
        <FieldDecorator.Header leftTitle="Memo" />
        <FieldDecorator.Body
          leftView={<FieldDecorator.Input input={props.input} type="text" placeholder="memo (optional)" />}
          {...props}
        />
      </FieldDecorator>
    );
  }, []);

  const renderNetworkFeeField = useCallback((props: WrappedFieldProps) => {
    return (
      <FieldDecorator disabled={true}>
        <FieldDecorator.Header leftTitle="Network Fee" />
        <FieldDecorator.Body
          leftView={<FieldDecorator.Input input={props.input} type="text" placeholder={getNetworkFee()} />}
          rightView={
            <Typography.Text type="p1" color="white" fontWeight={600} className={'hover-opacity'} textAlign="right">
              {'PRV'}
            </Typography.Text>
          }
          {...props}
        />
      </FieldDecorator>
    );
  }, []);

  return (
    <Container>
      <form onSubmit={handleSubmit(handleSendInscription)}>
        {/* <Field name={FORM_CONFIGS.amount} component={renderAmountField} validate={validateAmount} /> */}

        {/* <Space.Vertical size={20} /> */}

        <Field name={FORM_CONFIGS.toAddress} component={renderAddressField} validate={validateAddress} />

        <Space.Vertical size={25} />

        <Field name={FORM_CONFIGS.memo} component={renderMemoField} />

        <Space.Vertical size={25} />

        <Field name={FORM_CONFIGS.fee} component={renderNetworkFeeField} />

        {!isEnoughPRVNetworkFee && <ErrorView message="Your PRV balance is insufficient to cover network fees." />}

        <Space.Vertical size={40} />

        <ButtonConfirmed height={'50px'} type="submit" disabled={!isEnoughPRVNetworkFee || sendBtnDisable}>
          {'Send Inscription'}
        </ButtonConfirmed>
      </form>
    </Container>
  );
};

export default enhance(FormSend);
