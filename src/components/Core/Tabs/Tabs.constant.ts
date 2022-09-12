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
    tabNames: ['Profile', 'Submit Proof', 'Transactions'],
    rootTab: getRootTab('INCOGNITO_ACCOUNT'),
  },
  SUBMIT_PROOF: {
    tabNames: ['Deposit', 'Swap'],
    rootTab: getRootTab('SUBMIT_PROOF'),
  },
};

export { TAB_LIST };
