import { Interface } from '@ethersproject/abi';
import { Currency, CurrencyAmount } from '@uniswap/sdk-core';
import { useWeb3React } from '@web3-react/core';
import ERC20ABI from 'abis/erc20.json';
import { Erc20Interface } from 'abis/types/Erc20';
import { nativeOnChain } from 'constants/tokens';
import { useInterfaceMulticall } from 'hooks/useContract';
import JSBI from 'jsbi';
import { useMultipleContractSingleData, useSingleContractMultipleData } from 'lib/hooks/multicall';
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
          memo[address] = CurrencyAmount.fromRawAmount(nativeOnChain(chainId), JSBI.BigInt(value.toString()));
        }
        return memo;
      }, {}),
    [validAddressInputs, chainId, results]
  );
}

const ERC20Interface = new Interface(ERC20ABI) as Erc20Interface;
const tokenBalancesGasRequirement = { gasRequired: 185_000 };

/**
 * Returns a map of token addresses to their eventually consistent token balances for a single account.
 */
export function useTokenBalancesWithLoadingIndicator(
  address?: string,
  tokens?: (any | undefined)[]
): [{ [tokenAddress: string]: CurrencyAmount<any> | undefined }, boolean] {
  const validatedTokens: any[] = useMemo(
    () => tokens?.filter((t?: any): t is any => isAddress(t?.contractID) !== false) ?? [],
    [tokens]
  );
  const validatedTokenAddresses = useMemo(() => validatedTokens.map((vt) => vt.contractID), [validatedTokens]);

  const balances = useMultipleContractSingleData(
    validatedTokenAddresses,
    ERC20Interface,
    'balanceOf',
    useMemo(() => [address], [address]),
    tokenBalancesGasRequirement
  );

  const anyLoading: boolean = useMemo(() => balances.some((callState) => callState.loading), [balances]);

  return useMemo(
    () => [
      address && validatedTokens.length > 0
        ? validatedTokens.reduce<{ [tokenAddress: string]: CurrencyAmount<any> | undefined }>((memo, token, i) => {
            const value = balances?.[i]?.result?.[0];
            const amount = value ? JSBI.BigInt(value.toString()) : undefined;
            if (amount) {
              memo[token.address] = CurrencyAmount.fromRawAmount(token, amount);
            }
            return memo;
          }, {})
        : {},
      anyLoading,
    ],
    [address, validatedTokens, anyLoading, balances]
  );
}

export function useTokenBalances(
  address?: string,
  tokens?: (any | undefined)[]
): { [tokenAddress: string]: CurrencyAmount<any> | undefined } {
  return useTokenBalancesWithLoadingIndicator(address, tokens)[0];
}

const useCurrencyBalances = (account?: string, currencies?: (SelectedPrivacy | undefined)[]): any => {
  const tokens = useMemo(
    () => currencies?.filter((currency) => !currency?.isMainEVMToken ?? false) ?? [],
    [currencies]
  );

  const tokenBalances = useTokenBalances(account, tokens);
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
        if (currency.contractID) return tokenBalances[currency.contractID];
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
