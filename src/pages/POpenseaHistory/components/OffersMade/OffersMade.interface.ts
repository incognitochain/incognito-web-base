import { IPOpenseaOfferStorage } from './OffersMade.storage';

export enum OfferStatus {
  submitting = 'submitting',
  reverted = 'reverted',
  pending = 'pending',
  filled = 'filled',
  claiming = 'claiming',
  claimed = 'claimed',
  cancelled = 'cancelled',
  cancelling = 'cancelling',
}

export interface IPOpenseaOfferMade extends IPOpenseaOfferStorage {
  status?: OfferStatus;
  offerIncTx?: string;
  offerExternalTx?: string;
}
