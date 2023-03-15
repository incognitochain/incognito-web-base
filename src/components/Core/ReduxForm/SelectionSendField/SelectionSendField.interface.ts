import PToken, { ITokenNetwork } from 'models/model/pTokenModel';
import React from 'react';
import { WrappedFieldInputProps, WrappedFieldMetaProps } from 'redux-form';

export interface ISelectionFieldProps {
  meta: WrappedFieldMetaProps;
  input: WrappedFieldInputProps;
  componentProps: React.InputHTMLAttributes<HTMLInputElement> | any;
  headerTitle?: string;
  tokens?: PToken[];
  networks?: ITokenNetwork[];
  tokenSymbol: string;
  tokenPlaceholder?: string;
  tokenImgUrl: string;

  networkName: string;
  networkPlaceholder?: string;
  showNetwork?: boolean;

  amount: string;

  onSelectToken?: ({ token }: { token: PToken }) => void;
  onSelectNetwork?: ({ network }: { network: ITokenNetwork }) => void;

  className?: string;
  warning?: string;

  receiveValue?: string;
  isUseInput?: boolean;

  footerRightText?: string;
  footerRightClass?: string;
  onClickFooterRight?: () => void;
  showShowTopUp?: boolean;
  onTopUp?: () => void;
  tokenNetwork?: string;
  tokenAmountNum?: number;
  tokenType: 'sellToken' | 'buyToken';

  bodyRightView: React.ReactNode;

  maxButtonOnClick?: () => void;
  selectPaymentAddressButtonOnClick?: () => void;

  disabled?: boolean;
  feeSymbol?: string;
}

interface IInputProps {
  input: WrappedFieldInputProps;
  componentProps: React.InputHTMLAttributes<HTMLInputElement>;
}

interface ITextAreaProps {
  input: WrappedFieldInputProps;
  componentProps: React.TextareaHTMLAttributes<HTMLTextAreaElement>;
}
