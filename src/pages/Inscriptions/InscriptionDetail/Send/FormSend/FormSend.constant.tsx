export enum SendActionTypes {
  FETCHING = 'FormSendScinription/Fetching data',
  FETCHED = 'FormSendScinription/Fetched data',
  FREE_DATA = 'FormSendScinription/Free data',
  UNSHIELD = 'FormSendScinription/Unshield',
  SET_NETWORK_FEE = 'FormSendScinription/Set network fee',
  SET_BURN_FEE = 'FormSendScinription/Set burn fee',
  SET_INIT_FORM = 'FormSendScinription/Set int form',
}

export const FORM_CONFIGS = {
  formName: 'form-send-inscription',
  toAddress: 'toAddress',
  fee: 'fee',
  burnFee: 'burnFee',
  memo: 'memo',
};
