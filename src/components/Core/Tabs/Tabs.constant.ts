const getRootTab = (rootTab: string) => `${rootTab}`;

interface ITabList {
  [key: string]: {
    tabNames: string[];
    rootTab: string;
  };
}

const TAB_LIST: ITabList = {
  SWAP: {
    tabNames: ['Deposit', 'Swap'],
    rootTab: getRootTab('SWAP'),
  },
  INCOGNITO_ACCOUNT: {
    tabNames: ['Profile', 'Submit txDeposit', 'Submit txSwap'],
    rootTab: getRootTab('INCOGNITO_ACCOUNT'),
  },
};

export { TAB_LIST };
