import React from 'react';
import { WrappedFieldInputProps, WrappedFieldMetaProps } from 'redux-form';

import { Input } from './SelectionSendField.styled';

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

const InputField = (props: any) => {
  const { input: inputProps, componentProps, meta, isError, placeholder, disabled } = props;
  const { active } = meta || {};
  const quantityInputRef = React.useRef(null);
  React.useEffect(() => {
    const ignoreWheel = (e: any) => {
      e.preventDefault();
      if (e.which === 38 || e.which === 40) {
        e.preventDefault();
      }
    };
    const ignoreUpDown = (e: any) => {
      if (e.which === 38 || e.which === 40) {
        e.preventDefault();
      }
    };
    if (!quantityInputRef.current) return;
    // @ts-ignore
    quantityInputRef.current && quantityInputRef.current.addEventListener('wheel', ignoreWheel);
    // @ts-ignore
    quantityInputRef.current && quantityInputRef.current.addEventListener('keydown', ignoreUpDown);
  }, [quantityInputRef]);

  return (
    <Input
      disabled={disabled}
      className="default-padding"
      type="text"
      step="any"
      active={active}
      isError={isError}
      ref={quantityInputRef}
      autoComplete="off"
      placeholder={placeholder}
      {...inputProps}
      {...componentProps}
    />
  );
};

export default React.memo(InputField);
