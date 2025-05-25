import IOfferRepository from "../repository/offerrepository.interface";
import IPackageRepository from "../repository/packagerepository.interface";
import ICloudinaryService from "../services/cloudinaryservice.interface";
import IOfferUseCase from "../usecase/offerusecase.interface";

export default interface IOfferUsecaseDependencies {
    Repositories: {
        OfferRepository: IOfferRepository;
        PackageRepository: IPackageRepository;
    };
    Services: {
          CloudinaryService: ICloudinaryService;
    };
}

export interface IOfferControllerDependencies {
    OfferUseCase: IOfferUseCase;
}