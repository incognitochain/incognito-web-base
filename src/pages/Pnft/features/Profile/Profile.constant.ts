import { isMainnet } from 'config';
import { SupportedChainId } from 'constants/chains';

const HEADER_LIST = [
  { text: 'Rarity', className: 'medium-hide' },
  { text: 'List price' },
  { text: 'Cost', className: 'medium-hide' },
  { text: 'Received date', className: 'medium-hide' },
];
const CHAIN_ID = isMainnet ? SupportedChainId.MAINNET : SupportedChainId.KOVAN;

export { CHAIN_ID, HEADER_LIST };
