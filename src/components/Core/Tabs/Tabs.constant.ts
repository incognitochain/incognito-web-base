const getRootTab = (rootTab: string) => `${rootTab}`;

interface ITabList {
  [key: string]: {
    tabNames: string[];
    rootTab: string;
  };
}

const TAB_LIST: ITabList = {
  SWAP: {
    tabNames: ['Swap', 'Shield'],
    rootTab: getRootTab('SWAP'),
  },
  INCOGNITO_ACCOUNT: {
    // tabNames: ['Profile', 'Submit Proof', 'Transactions'],
    tabNames: ['Profile', 'Transactions', 'Keychain'],
    rootTab: getRootTab('INCOGNITO_ACCOUNT'),
  },
  SUBMIT_PROOF: {
    tabNames: ['Swap', 'Deposit'],
    rootTab: getRootTab('SUBMIT_PROOF'),
  },
  KEYCHAIN: {
    tabNames: ['Accounts', 'Actions'],
    rootTab: getRootTab('KEYCHAIN'),
  },
};

export { TAB_LIST };
