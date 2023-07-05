import { useEffect, useState } from 'react';
import { WalletType } from 'wallet/types';
import { WalletController } from 'wallet/WalletController';

type ReturnType = WalletController;

export default function useWalletController(): ReturnType {
  const [walletController, setWalletControlelr] = useState<ReturnType>(WalletController.getIntance());

  useEffect(() => {
    window.addEventListener('load', function () {
      const walletExtensionInstalled = window.incognito;
      const waleltType: WalletType = walletExtensionInstalled ? 'WalletExtension' : 'WalletWeb';
      walletController.setWalletType(waleltType);
      walletController.setWallet(undefined); // TO DO (Injection)
      setWalletControlelr(walletController);
    });
  }, []);

  return walletController;
}
