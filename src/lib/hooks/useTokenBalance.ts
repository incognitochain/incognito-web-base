import { Currency, CurrencyAmount } from '@uniswap/sdk-core';
import { useWeb3React } from '@web3-react/core';
import { nativeOnChain } from 'constants/tokens';
import { useInterfaceMulticall } from 'hooks/useContract';
import JSBI from 'jsbi';
import { useSingleContractMultipleData } from 'lib/hooks/multicall';
import SelectedPrivacy from 'models/model/SelectedPrivacyModel';
import { useMemo } from 'react';
import { isAddress } from 'utils';

/**
 * Returns a map of the given addresses to their eventually consistent ETH balances.
 */
export function useNativeCurrencyBalances(uncheckedAddresses?: (string | undefined)[]): {
  [address: string]: CurrencyAmount<Currency> | undefined;
} {
  const { chainId } = useWeb3React();
  const multicallContract = useInterfaceMulticall();

  const validAddressInputs: [string][] = useMemo(
    () =>
      uncheckedAddresses
        ? uncheckedAddresses
            .map(isAddress)
            .filter((a): a is string => a !== false)
            .sort()
            .map((addr) => [addr])
        : [],
    [uncheckedAddresses]
  );

  const results = useSingleContractMultipleData(multicallContract, 'getEthBalance', validAddressInputs);

  return useMemo(
    () =>
      validAddressInputs.reduce<{ [address: string]: CurrencyAmount<Currency> }>((memo, [address], i) => {
        const value = results?.[i]?.result?.[0];
        if (value && chainId) {
          console.log(
            'SANG TEST::: ',
            CurrencyAmount.fromRawAmount(nativeOnChain(chainId), JSBI.BigInt(value.toString()))
          );
        }
        if (value && chainId)
          memo[address] = CurrencyAmount.fromRawAmount(nativeOnChain(chainId), JSBI.BigInt(value.toString()));
        return memo;
      }, {}),
    [validAddressInputs, chainId, results]
  );
}

const useCurrencyBalances = (account?: string, currencies?: (SelectedPrivacy | undefined)[]): any => {
  // const tokens = useMemo(
  //   () => currencies?.filter((currency): currency is Token => currency?.isToken ?? false) ?? [],
  //   [currencies]
  // );
  //
  // const tokenBalances = useTokenBalances(account, tokens);
  const containsMainEVM: boolean = useMemo(
    () => currencies?.some((currency) => currency?.isMainEVMToken) ?? false,
    [currencies]
  );
  const nativeBalance = useNativeCurrencyBalances(
    useMemo(() => (containsMainEVM ? [account] : []), [containsMainEVM, account])
  );

  return useMemo(
    () =>
      currencies?.map((currency) => {
        if (!account || !currency) return undefined;
        if (currency.isMainEVMToken) return nativeBalance[account];
        // if (!currency.isMainEVMToken) return tokenBalances[currency.address];
        return undefined;
      }) ?? [],
    [account, currencies]
  );
};

const useCurrencyBalance = (account?: string, currency?: SelectedPrivacy): CurrencyAmount<Currency> | undefined => {
  return useCurrencyBalances(
    account,
    useMemo(() => [currency], [currency])
  )[0];
};

export { useCurrencyBalance };
