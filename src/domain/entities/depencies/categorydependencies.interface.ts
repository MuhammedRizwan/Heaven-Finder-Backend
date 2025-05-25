import ICategoryRepository from "../repository/categoryrepository.interface";
import ICloudinaryService from "../services/cloudinaryservice.interface";
import ICategoryUseCase from "../usecase/categoryusecase.interface";

export default interface ICategoryUsecaseDependencies {
    Repositories: {
        CategoryRepository: ICategoryRepository;
    };
    Services: {
         CloudinaryService: ICloudinaryService;
    };
}

export interface ICategoryControllerDependencies{
CategoryUseCase: ICategoryUseCase;
}