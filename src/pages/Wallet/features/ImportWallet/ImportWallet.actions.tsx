import { importMasterKey, ImportMasterKeyPayload } from 'state/masterKey';

interface IComponent {
  history: any;
  setLoading: (data: boolean) => void;
}
export interface IImportWalletAction {
  importWallet: (data: ImportMasterKeyPayload) => void;
}

export class ImportWalletAction implements IImportWalletAction {
  protected component: IComponent;
  protected dispatch: any;

  constructor(props: { component: IComponent; dispatch: any }) {
    this.component = props.component;
    this.dispatch = props.dispatch;
  }

  importWallet = async (data: ImportMasterKeyPayload) => {
    try {
      this.component.setLoading(true);
      const wallet = await this.dispatch(importMasterKey(data));
      if (wallet && wallet.PassPhrase) {
        this.component.history.push('/');
      }
    } catch (error) {
      console.log('importWalletError: ', error);
    } finally {
      this.component.setLoading(false);
    }
  };
}
