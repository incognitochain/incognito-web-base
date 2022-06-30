import Row from 'components/Core/Row';
import React from 'react';
import { WrappedFieldInputProps, WrappedFieldMetaProps } from 'redux-form';

import { INPUT_FIELD } from './InputField.constant';
import { Styled } from './InputField.styled';

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

export const Input = React.memo((props: IInputProps) => {
  const { input: inputProps, componentProps } = props;
  return <input className="fs-large" type="text" autoComplete="off" {...inputProps} {...componentProps} />;
});

Input.displayName = 'Input';

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
    subtitle,
    suffix,
    onClickMax,
    onClickAddressBook,
    onClickScan,
    warning,
    errorCustom,
    leftTitle,
    rightTitle,
  } = props;
  const { error: errorMeta, touched, submitting } = meta;
  const error = errorMeta || errorCustom;
  const [togglePassword, setTogglePassword] = React.useState(false);
  const handleTogglePassword = () => setTogglePassword(!togglePassword);
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
        <p className="fs-small fw-regular">{leftTitle}</p>
        {rightTitle && <p className="fs-small fw-regular">{rightTitle}</p>}
      </Row>
    );
  };
  const renderInput = () => {
    switch (inputType) {
      case INPUT_FIELD.amount:
        return (
          <div className="input-container input-amount">
            <Input {...{ input, componentProps }} />
            {/*<div className="sub-icon">*/}
            {/*  <MaxBtn onClick={onClickMax} />*/}
            {/*</div>*/}
          </div>
        );
      case INPUT_FIELD.address:
        return (
          <div className="input-container input-address">
            <Input {...{ input, componentProps }} />
          </div>
        );
      default:
        return (
          <div className="input-container">
            <Input {...{ input, componentProps }} />
          </div>
        );
    }
  };
  return (
    <Styled>
      {renderHeader()}
      {renderInput()}
      {renderError()}
    </Styled>
  );
};

export default React.memo(InputField);
