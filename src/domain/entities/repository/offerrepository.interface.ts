import IOffer from "../model/offer.interface";

export default interface IOfferRepository {
    getAllOffers(
      agentId: string,
      query: object,
      page: number,
      limit: number,
      filter: object
    ): Promise<IOffer[]>;
    createOffer(offer: IOffer): Promise<IOffer>;
    countDocument(
      agentId: string,
      query: object,
      filter: object
    ): Promise<number>;
    getOffer(offerId: string): Promise<IOffer>;
    updateOffer(offerId: string, offer: IOffer): Promise<IOffer>;
    blockNUnblockOffer(offerId: string, is_active: boolean): Promise<IOffer>;
    getAllOffersToday(today: Date): Promise<IOffer[]>;
    getAllOffersExpired(today: Date): Promise<IOffer[]>;
  }