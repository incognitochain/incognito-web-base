import { IPOpenseaOfferStorage } from './OffersMade.storage';

export enum OfferStatus {
  submitting = 'submitting',
  submit_failed = 'submit_failed',
  pending = 'pending',
  executing = 'executing',
  rejected = 'rejected',
  accepted = 'accepted',
  success = 'success',
  refund = 'refunded',
  refunding = 'refunding',
  submitFail = 'failed',
}

export interface IPOpenseaOfferMade extends IPOpenseaOfferStorage {
  status?: OfferStatus;
}
