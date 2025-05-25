import { NextFunction, Request, Response } from "express";
import { isString } from "./admin.controller";
import CustomError  from "../../domain/errors/customError";
import HttpStatusCode from "../../domain/enum/httpstatus";
import IOfferUseCase from "../../domain/entities/usecase/offerusecase.interface";
import { IOfferControllerDependencies } from "../../domain/entities/depencies/offerdependencies.interface";
import { IOfferController } from "../../domain/entities/controller/offercontroller.interface";


export default class OfferController implements IOfferController {
  private _OfferUseCase: IOfferUseCase;
  constructor(dependencies: IOfferControllerDependencies) {
    this._OfferUseCase = dependencies.OfferUseCase;
  }
  async getAllOffers(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { agentId } = req.params;
      const search = isString(req.query.search) ? req.query.search : "";
      const page = isString(req.query.page) ? parseInt(req.query.page, 10) : 1;
      const limit = isString(req.query.limit)
        ? parseInt(req.query.limit, 10)
        : 3;
      const filter = isString(req.query.filter) ? req.query.filter : "";
      const { offers, totalItems, totalPages, currentPage } =
        await this._OfferUseCase.getAllOffers(
          agentId,
          search,
          page,
          limit,
          filter
        );
      res.status(HttpStatusCode.OK).json({
        success: true,
        message: "Offers fetched successfully",
        filterData: offers,
        totalPages,
        totalItems,
        currentPage,
      });
    } catch (error) {
      next(error);
    }
  }
  async createOffer(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const offer = await this._OfferUseCase.createOffer(req.body, req.file);
      res
        .status(HttpStatusCode.CREATED)
        .json({ success: true, message: "Offer created successfully", offer });
    } catch (error) {
      next(error);
    }
  }
  async getOffer(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { offerId } = req.params;
      const offer = await this._OfferUseCase.getOffer(offerId);
      return res
        .status(HttpStatusCode.OK)
        .json({ success: true, message: "Offer fetched successfully", offer });
    } catch (error) {
      next(error);
    }
  }
  async updateOffer(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { offerId } = req.params;
      const offer = await this._OfferUseCase.updateOffer(
        offerId,
        req.body,
        req.file
      );
      return res
        .status(HttpStatusCode.OK)
        .json({ success: true, message: "Offer updated successfully", offer });
    } catch (error) {
      next(error);
    }
  }
  async blockNUnblockOffer(req: Request, res: Response, next: NextFunction) : Promise<Response | void>{
    try {
      const { offerId } = req.params;
      const { is_active } = req.body;
      const offer = await this._OfferUseCase.blockNUnblockOffer(
        offerId,
        is_active
      );
      return res
        .status(HttpStatusCode.OK)
        .json({ success: true, message: "Offer status updated", offer });
    } catch (error) {
      next(error);
    }
  }
  async addofferPackage(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { agentId } = req.params;
      const packages = await this._OfferUseCase.addofferPackage(agentId);
      return res
        .status(HttpStatusCode.OK)
        .json({
          success: true,
          message: "Offer updated successfully",
          packages,
        });
    } catch (error) {
      next(error);
    }
  }
  async execute(): Promise<Response | void>{
    try {
      await this._OfferUseCase.executeOffers()
    } catch (error) {
      throw new CustomError("internal seerver error",HttpStatusCode.INTERNAL_SERVER_ERROR)
    }
  }
}
