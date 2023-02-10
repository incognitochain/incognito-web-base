import { Method } from '../../object';
import { TokenID } from '../../token';
import { BalanceObject } from '../../types';

//Specific Action
interface FollowToken extends Method {
  getKeyFollowTokens(): void | Error;
  getKeyFollowedDefaultTokens(): void | Error;

  getListFollowingTokens(): Promise<TokenID[]> | Error;
  isFollowedDefaultTokens(): Promise<boolean> | Error;
  followingDefaultTokens(params: { tokenIDs: TokenID[] }): Promise<void | Error>;
  setListFollowingTokens(params: { list: TokenID[] }): Promise<boolean | Error>;
  addListFollowingToken(params: { tokenIDs: TokenID[] }): Promise<void | Error>;
  removeFollowingToken(params: { tokenID: TokenID[] }): Promise<void | Error>;

  getFollowTokensBalance(params: { defaultTokens: TokenID[]; version: number }):
    | Promise<{
        followTokens: TokenID[];
        balance: BalanceObject[];
      }> &
        Error;
}

export type { FollowToken };
