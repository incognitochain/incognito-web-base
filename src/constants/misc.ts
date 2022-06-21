export const NetworkContextName = 'NETWORK';

const IS_IN_IFRAME = window.parent !== window;

// transaction popup dismisal amounts
const DEFAULT_TXN_DISMISS_MS = 25000;
const L2_TXN_DISMISS_MS = 5000;

export { DEFAULT_TXN_DISMISS_MS, IS_IN_IFRAME, L2_TXN_DISMISS_MS };
