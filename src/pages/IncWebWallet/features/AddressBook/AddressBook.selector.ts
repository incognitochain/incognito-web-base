import { createSelector } from 'reselect';
import { defaultAccountPaymentAddressSelector, listAccountSelector } from 'state/account/account.selectors';

export const getAccountListSelector = createSelector(
  listAccountSelector,
  defaultAccountPaymentAddressSelector,
  (accountList, defaultAccountPaymentAddress) => {
    return accountList.filter((account) => account.paymentAddress !== defaultAccountPaymentAddress) || [];
  }
);
