import React from 'react';
import { WrappedFieldInputProps, WrappedFieldMetaProps } from 'redux-form';

import { Input } from './SelectionField.styled';

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
  const { input: inputProps, componentProps, meta, isError } = props;
  const { active } = meta || {};
  const quantityInputRef = React.useRef(null);

  React.useEffect(() => {
    const ignoreScroll = (e: any) => {
      e.preventDefault();
    };
    if (!quantityInputRef.current) return;
    // @ts-ignore
    quantityInputRef.current && quantityInputRef.current.addEventListener('wheel', ignoreScroll);
  }, [quantityInputRef]);

  return (
    <Input
      className="default-padding"
      type="text"
      active={active}
      isError={isError}
      ref={quantityInputRef}
      autoComplete="off"
      placeholder="0.00"
      {...inputProps}
      {...componentProps}
    />
  );
};

export default React.memo(InputField);
