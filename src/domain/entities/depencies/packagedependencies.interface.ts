import IPackageRepository from "../repository/packagerepository.interface";
import ICloudinaryService from "../services/cloudinaryservice.interface";
import IPackageUseCase from "../usecase/packageusecase.interface";

export default interface IPackageUsecaseDependencies {
    Repositories: {
        PackageRepository: IPackageRepository;
    };
    Services: {
        CloudinaryService: ICloudinaryService;
    };
}

export interface IPackageControllerDependencies {
    PackageUseCase: IPackageUseCase;
}