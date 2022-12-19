/* eslint-disable react/no-children-prop */
import { Checkbox, DatePicker, Form, Input, Radio, Select } from 'antd';
import { ButtonConfirmed } from 'components/Core/Button';
import { InputField } from 'components/Core/ReduxForm';
import React from 'react';
import { Field, reduxForm } from 'redux-form';
import styled from 'styled-components/macro';

const { TextArea } = Input;

const Styled = styled.div`
  textarea.ant-input {
    max-width: 100%;
    min-height: 200px;
  }
`;

const DescriptionContainer = styled.div`
  border: 1px solid #363636;
  border-radius: 16px;
  padding: 24px;
`;

const DescriptionText = styled.p`
  font-weight: 500;
  font-size: 16px;
  line-height: 140%;
  color: #9c9c9c;
`;

const FormContainer = styled.div`
  border: 1px solid #363636;
  border-radius: 16px;
  padding: 32px;
  margin-top: 48px;
  align-self: center;
  margin-bottom: 40px;
  width: 100%;
  max-width: 700px;
`;

const InputField1 = styled(TextArea)`
  width: 100%;
  background: #252525;
  border-radius: 8px;
  border: 0px;
  font-weight: 400;
  font-size: 16px;
  line-height: 140%;
  color: #9c9c9c;
  padding: 14px 16px;
  margin-top: 8px;
  min-height: 500px;
`;

const InputFieldLabel = styled.p`
  font-weight: 400;
  font-size: 14px;
  line-height: 140%;
  color: #ffffff;
`;

const Space = styled.div`
  width: 100%;
  height: 24px;
`;

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const { Option } = Select;
const { RangePicker } = DatePicker;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 14,
      offset: 6,
    },
  },
};

const makeField =
  (Component: any) =>
  // eslint-disable-next-line react/prop-types
  ({ input, meta, children, hasFeedback, label, ...rest }: any) => {
    // eslint-disable-next-line react/prop-types
    const hasError = meta.touched && meta.invalid;
    return (
      <FormItem
        {...formItemLayout}
        label={label}
        validateStatus={hasError ? 'error' : 'success'}
        hasFeedback={hasFeedback && hasError}
        // eslint-disable-next-line react/prop-types
        help={hasError && meta?.error}
      >
        <Component {...input} {...rest} children={children} />
      </FormItem>
    );
  };

const AInput = makeField(Input);
const ARadioGroup = makeField(RadioGroup);
const ASelect = makeField(Select);
const ACheckbox = makeField(Checkbox);
const ATextarea = makeField(InputField1);
const ARangePicker = makeField(RangePicker);

const CreateProposal = () => {
  return (
    <Styled>
      <div
        className="default-padding-horizontal"
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
      >
        <DescriptionContainer>
          <DescriptionText>
            Tip: Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
            nulla pariatur.
          </DescriptionText>
        </DescriptionContainer>
        <FormContainer>
          <form>
            <InputFieldLabel>Proposal</InputFieldLabel>
            {/* <Field
            component={InputField1}
            name="Proposal"
            leftTitle="Proposal"
            placeholder="Proposal title"
            componentProps={{
              placeholder: 'Proposal title',
              type: 'text',
              style: {
                height: '200px',
              },
            }}
          /> */}
            <Field
              component={InputField}
              name="Proposal"
              inputType="text"
              // leftTitle="Slippage tolerance (%)"
              componentProps={{
                placeholder: 'Proposal title',
                type: 'text',
              }}
            />
            <Space />
            <InputFieldLabel>Summary</InputFieldLabel>
            <Field
              component={InputField1}
              name="Summary"
              leftTitle="Summary"
              placeholder="Insert your summary here"
              componentProps={{
                placeholder: 'Proposal title',
                type: 'text',
                style: {
                  height: '200px',
                },
              }}
            />
            <Space />
            <InputFieldLabel>Methodology</InputFieldLabel>
            <Field
              component={InputField1}
              name="Methodology"
              placeholder="Insert your methodology"
              componentProps={{
                placeholder: 'Proposal title',
                type: 'text',
                style: {
                  height: '400px',
                },
              }}
            />
            <Space />
            <InputFieldLabel>Conclusion</InputFieldLabel>
            <Field
              component={InputField1}
              name="Conclusion"
              placeholder="Insert your conclusion here"
              componentProps={{
                placeholder: 'Proposal title',
                type: 'text',
                style: {
                  height: '200px',
                },
              }}
            />
            <Space />
            <ButtonConfirmed disabled height={'50px'} type="submit">
              Button
            </ButtonConfirmed>
          </form>
        </FormContainer>
      </div>
    </Styled>
  );
};
export default reduxForm({
  form: 'createProposal',
})(CreateProposal);
