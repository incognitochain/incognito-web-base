import { toast } from 'react-toastify';
import { importMasterKey, ImportMasterKeyPayload } from 'state/masterKey';

interface IComponent {
  history: any;
  setLoading: (data: boolean) => void;
  setErrMess: (data: string) => void;
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
        toast.success('Assets Imported');
      }
    } catch (error) {
      const err = new Error(error);
      if (err.message.includes('Mnemonic words is invalid')) {
        this.component.setErrMess('Your phrase is invalid');
      } else {
        this.component.setErrMess('Something went wrong');
      }
      console.log('importWalletError: ', err);
    } finally {
      this.component.setLoading(false);
    }
  };
}
