import { uniq } from 'lodash';
import { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { defaultAccountWalletSelector } from 'state/account/account.selectors';
import { incognitoAccountFollowTokenIDs } from 'state/incognitoWallet';
import {
  fetchMyInscriptionListAPI,
  getInscriptionTokenIDsListSelector,
  getNFTCoinsInforSelector,
  getNFTCoinsSelector,
  setInscriptionList,
  setMyInscriptionList,
  setNFTUnspentCoins,
} from 'state/inscriptions';

import { WalletState } from '../core/types';
import ScanCoinService from '../services/scainCoinService';
import useWalletState from './useWalletState';

const LOAD_NFT_UNSPENT_COINS_INTERVAL_TIMER = 10000; //10s

export default function useNFTCoins() {
  const dispatch = useDispatch();

  const { walletState } = useWalletState();
  const currentAccount = useSelector(defaultAccountWalletSelector);
  const accountSender = useSelector(defaultAccountWalletSelector);
  const followedTokenIDList: any[] = useSelector(incognitoAccountFollowTokenIDs);
  const myInscriptionTokenIDsList = useSelector(getInscriptionTokenIDsListSelector);
  const NFTCoins = useSelector(getNFTCoinsSelector);
  const { assetTagList, tokenIdsList } = useSelector(getNFTCoinsInforSelector);

  const timerRef = useRef<any>();

  const addListFollowingTokenHandler = async () => {
    //Remove duplicate tokenID
    const newtokenIDs = uniq([...followedTokenIDList, ...myInscriptionTokenIDsList]);

    // SAVE new list token to storage by SDK
    await accountSender.addListFollowingToken({
      tokenIDs: newtokenIDs,
    });

    //Scan Coin method from WebJS
    await ScanCoinService.scan({ accountWallet: currentAccount, tokenList: newtokenIDs });
  };

  useEffect(() => {
    if (currentAccount && walletState === WalletState.unlocked) {
      addListFollowingTokenHandler();
    }
  }, [currentAccount, walletState, followedTokenIDList, myInscriptionTokenIDsList]);

  const fetchMyInscriptionsAPI = useCallback(async () => {
    dispatch(
      fetchMyInscriptionListAPI({
        assetTagList,
        tokenIdsList,
      })
    );
  }, [NFTCoins, assetTagList, tokenIdsList]);

  useEffect(() => {
    if (NFTCoins && NFTCoins.length > 0 && walletState === WalletState.unlocked) {
      fetchMyInscriptionsAPI();
    } else {
      dispatch(setMyInscriptionList([]));
    }
  }, [NFTCoins, walletState]);

  const clearTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = undefined;
  };

  const loadNFTUnSpentCoinsLocal = async () => {
    let data = [];
    try {
      if (currentAccount && currentAccount.getNFTUnspentCoinsList) {
        data = await currentAccount.getNFTUnspentCoinsV3();
      } else {
        data = [];
      }
    } catch (error) {
      console.error('---- [loadNFTUnSpentCoinsLocal] ---- ');
      console.log('[loadNFTUnSpentCoinsLocal] ERROR: ', error);
      data = [];
    } finally {
      dispatch(setNFTUnspentCoins(data));
    }
  };

  useEffect(() => {
    clearTimer();
    loadNFTUnSpentCoinsLocal();
    if (timerRef) {
      timerRef.current = setInterval(() => {
        loadNFTUnSpentCoinsLocal();
      }, LOAD_NFT_UNSPENT_COINS_INTERVAL_TIMER);
    }
    return () => {
      clearTimer();
    };
  }, [currentAccount, walletState]);

  useEffect(() => {
    if (walletState === WalletState.locked || walletState === WalletState.uninitialized) {
      dispatch(setNFTUnspentCoins([]));
      dispatch(setInscriptionList([]));
    }
  }, [walletState]);
}
