import { Object } from '../object';
import { CoinsV3 } from './CoinsV3';
import { FollowToken } from './followToken';

//Define Class Account with abtract method and property ( TO DO, will do after)
abstract class AccountSDK extends Object {}

type AccountProperty = {
  ID?: number;
  AccountName?: string;
  PrivateKey?: string;
  PaymentAddress?: string;
  ReadonlyKey?: string;
  PublicKey?: string;
  PublicKeyCheckEncode?: string;
  ValidatorKey?: string;
  BLSPublicKey?: string;
  PublicKeyBytes?: string;
  OTAKey?: string;
  PaymentAddressV1?: string;
  accountName?: string;
  name?: string;
  PublicKeyBase64?: string;
  Index?: number;
};

//Define Account's methods
interface AccountMethod extends FollowToken, CoinsV3 {}

type Account = AccountSDK & AccountProperty & AccountMethod;

export type { Account, AccountMethod, AccountSDK };
