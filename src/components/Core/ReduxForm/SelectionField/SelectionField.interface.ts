import PToken, { ITokenNetwork } from 'models/model/pTokenModel';
import React from 'react';
import { WrappedFieldInputProps } from 'redux-form';

export interface ISelectionFieldProps {
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
}

interface IInputProps {
  input: WrappedFieldInputProps;
  componentProps: React.InputHTMLAttributes<HTMLInputElement>;
}

interface ITextAreaProps {
  input: WrappedFieldInputProps;
  componentProps: React.TextareaHTMLAttributes<HTMLTextAreaElement>;
}
