import { uniq } from 'lodash';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { defaultAccountWalletSelector } from 'state/account/account.selectors';
import { incognitoAccountFollowTokenIDs } from 'state/incognitoWallet';
import {
  getInscriptionTokenIDsListSelector,
  getMyInscriptionList,
  getMyInscriptionListAPI,
  Inscription,
} from 'state/inscriptions';

import { NFTCoin } from '../../../state/inscriptions/inscriptions.types';
import { WalletState } from '../core/types';
import ScanCoinService from '../services/scainCoinService';
import useWalletState from './useWalletState';

const LOAD_NFT_UNSPENT_COINS_INTERVAL_TIMER = 10000; //10s

export default function useNFTCoins() {
  const dispatch = useDispatch();

  const { walletState } = useWalletState();
  const currentAccount = useSelector(defaultAccountWalletSelector);
  const myInscriptionList: Inscription[] = useSelector(getMyInscriptionList);
  const accountSender = useSelector(defaultAccountWalletSelector);
  const followedTokenIDList: any[] = useSelector(incognitoAccountFollowTokenIDs);
  const myInscriptionTokenIDsList = useSelector(getInscriptionTokenIDsListSelector);

  const timerRef = useRef<any>();

  const [NFTUnspentCoins, setNFTUnspentCoins] = useState<NFTCoin[]>([]);

  const assetTagList = useMemo(() => {
    return NFTUnspentCoins.map((item) => item.AssetTag) || [];
  }, [NFTUnspentCoins]);

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
    if (assetTagList && assetTagList.length > 0) {
      dispatch(
        getMyInscriptionListAPI({
          assetTagList,
        })
      );
    }
  }, [currentAccount, walletState, assetTagList]);

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
      // console.log('[loadNFTUnSpentCoinsLocal]: ', data);
      setNFTUnspentCoins(data);
    }
  };

  useEffect(() => {
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
    fetchMyInscriptionsAPI();
  }, [currentAccount, walletState]);

  return {
    assetTagList,
    myInscriptionList,
    myInscriptionTokenIDsList: [],
  };
}
