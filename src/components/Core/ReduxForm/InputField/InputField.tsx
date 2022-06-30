import Row from 'components/Core/Row';
import React from 'react';
import { WrappedFieldInputProps, WrappedFieldMetaProps } from 'redux-form';
import { ThemedText } from 'theme';

import { ButtonMax } from '../../Button/ButtonMax';
import { INPUT_FIELD } from './InputField.constant';
import { Input, InputContainer, InputPanel } from './InputField.styled';

export interface IInputFieldProps {
  meta: WrappedFieldMetaProps;
  input: WrappedFieldInputProps;
  componentProps: React.InputHTMLAttributes<HTMLInputElement> | any;
  inputType?: number;
  subtitle?: boolean;
  suffix?: string;
  onClickMax?: () => any;
  onClickAddressBook?: () => any;
  onClickScan?: () => any;
  warning?: string;
  errorCustom?: string;
  leftTitle: string;
  rightTitle?: string;
}

interface IInputProps {
  input: WrappedFieldInputProps;
  componentProps: React.InputHTMLAttributes<HTMLInputElement>;
}

interface ITextAreaProps {
  input: WrappedFieldInputProps;
  componentProps: React.TextareaHTMLAttributes<HTMLTextAreaElement>;
}

export const InputComp = React.memo((props: IInputProps) => {
  const { input: inputProps, componentProps } = props;
  console.log('SANG', props);
  return <Input className="fs-large" type="text" autoComplete="off" {...inputProps} {...componentProps} />;
});

InputComp.displayName = 'Input';

export const TextArea = React.memo((props: ITextAreaProps) => {
  const { input: inputProps, componentProps } = props;
  return <textarea className="fs-large" autoComplete="off" {...inputProps} {...componentProps} />;
});

TextArea.displayName = 'TextArea';

const InputField = (props: IInputFieldProps) => {
  const { meta, input, componentProps, inputType, onClickMax, warning, errorCustom, leftTitle, rightTitle } = props;
  const { error: errorMeta, touched, submitting } = meta;
  const error = errorMeta || errorCustom;
  const renderError = () => {
    if (submitting) {
      return null;
    }
    return (
      <>
        {(touched && error && <p className={`error fs-small fw-regular`}>{error}</p>) ||
          (touched && warning && <p className={`warning fs-small fw-regular`}>{warning}</p>)}
      </>
    );
  };

  const renderHeader = () => {
    return (
      <Row className="wrap-input-header">
        <ThemedText.SmallLabel fontWeight={400} color="primary8">
          {leftTitle}
        </ThemedText.SmallLabel>
        <ThemedText.SmallLabel fontWeight={400} color="primary8">
          {rightTitle}
        </ThemedText.SmallLabel>
      </Row>
    );
  };
  const renderInput = () => {
    switch (inputType) {
      case INPUT_FIELD.amount:
        return (
          <InputContainer className="input-container input-amount">
            <InputComp {...{ input, componentProps }} />
            <ButtonMax onClick={onClickMax} />
          </InputContainer>
        );
      case INPUT_FIELD.address:
        return (
          <InputContainer className="input-container input-address">
            <InputComp {...{ input, componentProps }} />
          </InputContainer>
        );
      default:
        return (
          <InputContainer className="input-container">
            <InputComp {...{ input, componentProps }} />
          </InputContainer>
        );
    }
  };
  return (
    <InputPanel>
      {renderHeader()}
      {renderInput()}
      {renderError()}
    </InputPanel>
  );
};

export default React.memo(InputField);
