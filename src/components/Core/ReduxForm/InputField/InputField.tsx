import CopyIcon from 'components/Copy';
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
  showIcon?: boolean;
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
  const quantityInputRef = React.useRef(null);

  React.useEffect(() => {
    const ignoreScroll = (e: any) => {
      e.preventDefault();
    };
    if (!quantityInputRef.current) return;
    // @ts-ignore
    quantityInputRef.current && quantityInputRef.current.addEventListener('wheel', ignoreScroll);
  }, [quantityInputRef]);

  return <Input type="text" ref={quantityInputRef} autoComplete="off" {...inputProps} {...componentProps} />;
});

InputComp.displayName = 'Input';

export const TextArea = React.memo((props: ITextAreaProps) => {
  const { input: inputProps, componentProps } = props;
  return <textarea className="fs-large" autoComplete="off" {...inputProps} {...componentProps} />;
});

TextArea.displayName = 'TextArea';

const InputField = (props: IInputFieldProps) => {
  const {
    meta,
    input,
    componentProps,
    inputType,
    onClickMax,
    warning,
    errorCustom,
    leftTitle,
    rightTitle,
    showIcon = false,
  } = props;
  const { error: errorMeta, touched, submitting } = meta;
  const error = errorMeta || errorCustom;
  const isError = touched && error;
  const isWarning = touched && warning;
  const renderError = () => {
    if (submitting) {
      return null;
    }
    return (
      <>
        {(isError && (
          <ThemedText.Error marginTop="4px" error className={`error`}>
            {error}
          </ThemedText.Error>
        )) ||
          (isWarning && (
            <ThemedText.Warning marginTop="4px" warning className={`warning`}>
              {warning}
            </ThemedText.Warning>
          ))}
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
          <InputContainer className="border-hover input-container input-amount">
            <InputComp {...{ input, componentProps }} />
            {showIcon && <ButtonMax onClick={onClickMax} />}
          </InputContainer>
        );
      case INPUT_FIELD.address:
        // return (
        //   <InputContainer className="border-hover input-container input-address">
        //     <InputComp {...{ input, componentProps }} />
        //   </InputContainer>
        // );
        return (
          <InputContainer className="border-hover input-container input-address">
            <InputComp {...{ input, componentProps }} />
            {showIcon && <CopyIcon text={'Payment Address Here!!!'} />}
          </InputContainer>
        );
      default:
        return (
          <InputContainer className="border-hover input-container">
            <InputComp {...{ input, componentProps }} />
          </InputContainer>
        );
    }
  };
  return (
    <InputPanel className="wrap-input-panel">
      {renderHeader()}
      {renderInput()}
      {renderError()}
    </InputPanel>
  );
};

export default React.memo(InputField);
