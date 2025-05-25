import IOffer from "../model/offer.interface";
import IPackage from "../model/package.interface";


export default interface IOfferUseCase {
  getAllOffers(
    agentId: string,
    search: string,
    page: number,
    limit: number,
    filter: string
  ): Promise<{
    offers: IOffer[];
    totalItems: number;
    totalPages: number;
    currentPage: number;
  }>;

  createOffer(offer: IOffer, file?: Express.Multer.File): Promise<IOffer>;

  getOffer(offerId: string): Promise<IOffer>;

  updateOffer(
    offerId: string,
    offer: IOffer,
    file?: Express.Multer.File
  ): Promise<IOffer>;

  blockNUnblockOffer(offerId: string, is_active: boolean): Promise<IOffer>;

  addofferPackage(agentId: string): Promise<IPackage[]|null>;

  executeOffers(): Promise<void>;
}
