import IPostRepository from "../repository/postrepository.interface";
import ICloudinaryService from "../services/cloudinaryservice.interface";
import IPostUseCase from "../usecase/postusecase.interface";

export default interface IPostUsecaseDependencies {
  Repositories: {
    PostRepository: IPostRepository;
  };
  Services: {
    CloudinaryService: ICloudinaryService;
  };
}

export interface IPostControllerDependencies{
    PostUseCase: IPostUseCase;
}