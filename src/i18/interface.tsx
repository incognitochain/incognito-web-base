export interface ILanguage {
  [key: string]: any;
  market: IMarket;
  peggingApp: IPeggingApp;
  structure: IStructure;
}

export interface IMarket {
  mainTitle: any;
  untraceable: string;
  untraceableDetail: string;
  unlinkable: string;
  unlinkableDetail: string;
  commissionFree: string;
  commissionFreeDetail: string;
  privacyMarket: string;
  whatPCoins: string;
  name: string;
  lastPrice: string;
  change24h: string;
  privacyMarketplace: string;
  inCogIsNone: string;
  getStartedIn: string;
  volumeTraded: string;
  anonymousTrades: string;
  privateCryptocurrencies: string;
  bridgedBlockchains: string;
}

export interface IPeggingApp {
  mainTitle: string;
  howWork: string;
  private: string;
  privateSub: string;
  permission: string;
  permissionSub: string;
  trust: string;
  trustSub: string;
  privacyApp: string;
  coming: string;
}

export interface IStructure {
  mainTitle: string;
  mainDesc: string;
  becomeValidator: string;
  averageAnnualRoi: string;
  validatorsAcross: string;
  fairFixedStake: string;
  privacyByDesign: string;
  privacyByDesignDesc: string;
  privacyByDesignMore: string;
  privacyForEvery: string;
  privacyForEveryDesc: string;
  privacyForEveryMore: string;
  privacyAtScale: string;
  privacyAtScaleDesc: string;
  privacyAtScaleMore: string;
  privacyFuel: string;
  privacyFuelDesc: string;
  privacyFuelMore: string;
}
