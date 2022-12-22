const getRootTab = (rootTab: string) => `${rootTab}`;

interface ITabList {
  [key: string]: {
    tabNames: string[];
    rootTab: string;
  };
}

const TAB_LIST: ITabList = {
  SWAP: {
    tabNames: ['Swap', 'Deposit'],
    rootTab: getRootTab('SWAP'),
  },
  SWAP_PAPP: {
    tabNames: [],
    rootTab: getRootTab('SWAP_PAPP'),
  },
  INCOGNITO_ACCOUNT: {
    // tabNames: ['Profile', 'Submit Proof', 'Transactions'],
    tabNames: ['Profile', 'Transactions'],
    rootTab: getRootTab('INCOGNITO_ACCOUNT'),
  },
  SUBMIT_PROOF: {
    tabNames: ['Swap', 'Deposit'],
    rootTab: getRootTab('SUBMIT_PROOF'),
  },
};

export { TAB_LIST };
