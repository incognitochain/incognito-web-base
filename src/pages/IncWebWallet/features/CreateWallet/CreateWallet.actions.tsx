import { initMasterKey, InitMasterKeyPayload } from 'state/masterKey';

import { CreateWalletSteps } from './CreateWallet';

interface IComponent {
  setLoading: (data: boolean) => void;
  setCurrentStep: (data: CreateWalletSteps) => void;
}
export interface ICreateWalletAction {
  createWallet: (data: InitMasterKeyPayload) => void;
}

export class CreateWalletAction implements ICreateWalletAction {
  protected component: IComponent;
  protected dispatch: any;

  constructor(props: { component: IComponent; dispatch: any }) {
    this.component = props.component;
    this.dispatch = props.dispatch;
  }

  createWallet = async (data: InitMasterKeyPayload) => {
    try {
      this.component.setLoading(true);
      const wallet = await this.dispatch(initMasterKey(data));

      if (wallet && wallet.PassPhrase) {
        this.component.setCurrentStep(CreateWalletSteps.created);
      }
    } catch (error) {
      console.log('createWalletError: ', error);
    } finally {
      this.component.setLoading(false);
    }
  };
}
