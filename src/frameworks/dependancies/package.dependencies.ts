import PackageRepository  from "../../adapters/repositories/package.repository";
import CloudinaryService  from "../services/cloudinaryService";
import packageUseCase  from "../../application/usecases/package.usecase";

const Repositories = {
  PackageRepository: new PackageRepository(),
};

const Services = {
  CloudinaryService: new CloudinaryService(), 
};

const useCase = {
  PackageUseCase: new packageUseCase({ Repositories, Services }),
};

const PackageDependencies =useCase;

export default PackageDependencies