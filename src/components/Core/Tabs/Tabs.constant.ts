const getRootTab = (rootTab: string) => `ROOT_${rootTab}`;

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
};

export { TAB_LIST };
