import { isEmpty } from 'lodash';
import rpcPOpensea from 'services/rpcPOpensea';

import { IPOpenseaOfferMade, OfferStatus } from './OffersMade.interface';
import { getLocalPOpenseaOffers, IPOpenseaOfferStorage } from './OffersMade.storage';

interface IComponent {
  setIsFetching: (data: boolean) => void;
  setOffersMade: (data: IPOpenseaOfferMade[]) => void;
}

export interface IOffersMadeAction {
  getOffersMade: () => void;
}

export class OffersMadeAction implements IOffersMadeAction {
  protected component: IComponent;
  protected dispatch: any;

  constructor(props: { component: IComponent; dispatch: any }) {
    this.component = props.component;
    this.dispatch = props.dispatch;
  }

  getOffersMade = async () => {
    try {
      this.component.setIsFetching(true);
      const localOffers: IPOpenseaOfferStorage[] = (getLocalPOpenseaOffers() || []).reverse().slice(0, 20);
      if (!localOffers || localOffers.length === 0) return [];

      const offers = await rpcPOpensea.getOfferStatusTx(localOffers.map((localOffer) => localOffer.txHash));

      const combineOffers = this.combineOffersMade(localOffers, offers);
      console.log('combineOffers: ', combineOffers);

      this.component.setOffersMade(combineOffers);
    } catch (error) {
    } finally {
      this.component.setIsFetching(false);
    }
  };

  private combineOffersMade = (localOffers: IPOpenseaOfferStorage[], offers: any) => {
    try {
      const offersMade: IPOpenseaOfferMade[] = localOffers.map((localOffer: IPOpenseaOfferStorage) => {
        const offer = this.mapOffer(offers, localOffer);
        if (offer) {
          return offer;
        }
        return localOffer;
      }, []);
      return offersMade.filter((tx) => !!tx);
    } catch (error) {
      return [];
    }
  };

  private mapOffer = (offers: any, localOffer: IPOpenseaOfferStorage): IPOpenseaOfferMade | undefined => {
    const apiResp: any = offers[localOffer.txHash];
    if (!apiResp || isEmpty(apiResp)) return undefined;
    const data: IPOpenseaOfferMade = {
      ...localOffer,
      status: OfferStatus[apiResp.inc_request_tx_status as keyof typeof OfferStatus],
    };
    return data;
  };
}
