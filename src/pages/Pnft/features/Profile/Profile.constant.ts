import { isMainnet } from 'config';
import { SupportedChainId } from 'constants/chains';

const HEADER_LIST = [{ text: 'Rarity' }, { text: 'List price' }, { text: 'Cost' }, { text: 'Received date' }];
const CHAIN_ID = isMainnet ? SupportedChainId.MAINNET : SupportedChainId.KOVAN;

export { CHAIN_ID, HEADER_LIST };
