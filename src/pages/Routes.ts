const RoutePaths = {
  HOME: '/',
  INTERNET_DISCONNECTED: '/internet-disconnected',
  STRUCTURE: ['/wallet', '/mine', '/wallet.html'],
  SWAP: '/swap',
  PAPPS_ID: '/papps/:id',
  PAPPS: '/papps',

  INSCRIPTIONS: '/inscriptions',
  INSCRIPTION_DETAIL: '/inscription/:tokenId',
  CREATE_INSCRIPTION: '/create-inscription',
  // MY_INSCRIPTIONS: '/my-inscriptions',

  EARNINGS: '/earnings',
  PRIVACY_POLICY: '/privacy-policy',
  TERM_OF_SERVICE: '/term-of-service',
  MINE_VALIDATOR: '/mine/validator',
  GET_PRV: '/get-prv',
  BUY_NODE: '/buy-node',
  DEPOSIT: '/deposit',
  POPEN_SEA: '/popensea',
  DAPPS_POPENSEA_DEATIL_CONTRACT: '/papps/popensea/detail/:contract',
  DAPPS_POPENSEA_DEATIL_CONTRACT_TOKENID: 'papps/popensea/detail/:contract/:tokenId',

  //Wallet
  WALLET_CREATE: '/wallet/create',
  WALLET_IMPORT_RESTORE: ['/wallet/import', '/wallet/restore'],
  WALLET_ACCOUNT: '/wallet/account',
  WALLET_SETTINGS: '/wallet/settings',

  VOTE: '/vote',
  CREATE_PROPOSAL: '/create-proposal',
  VOTE_ID: '/vote/:id',
};
export { RoutePaths };
