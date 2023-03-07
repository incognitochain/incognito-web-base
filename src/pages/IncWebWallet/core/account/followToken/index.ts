import { Method } from '../../object';
import { TokenID } from '../../token';
import { BalanceObject } from '../../types';

//Specific Action
interface FollowToken extends Method {
  getKeyFollowTokens(): void | Error;
  getKeyFollowedDefaultTokens(): void | Error;

  getListFollowingTokens(): Promise<TokenID[]>;
  isFollowedDefaultTokens(): Promise<boolean> | Error;
  followingDefaultTokens(params: { tokenIDs: TokenID[] }): Promise<void>;
  setListFollowingTokens(params: { list: TokenID[] }): Promise<boolean>;
  addListFollowingToken(params: { tokenIDs: TokenID[] }): Promise<void>;
  removeFollowingToken(params: { tokenID: TokenID[] }): Promise<void>;

  getFollowTokensBalance(params: { defaultTokens: TokenID[]; version: number }): Promise<{
    followTokens: TokenID[];
    balance: BalanceObject[];
  }>;
}

export type { FollowToken };
