import  IPackage from "../../../domain/entities/model/package.interface";

export default interface IPackageUseCase {
  createPackage(
    package_data: IPackage,
    files?: { [fieldname: string]: Express.Multer.File[] } | Express.Multer.File[]
  ): Promise<IPackage>;

  getPackage(id: string): Promise<IPackage>;

  getAllPackages(
    search: string,
    page: number,
    limit: number,
    categoryId: string,
    days: string,
    startRange: string,
    endRange: string
  ): Promise<{
    packages: IPackage[];
    totalItems: number;
    totalPages: number;
    currentPage: number;
  }>;

  editPackage(
    id: string,
    packageData: IPackage,
    files?: { [fieldname: string]: Express.Multer.File[] } | Express.Multer.File[]
  ): Promise<IPackage>;

  blocknUnblockPackage(packageId: string, isBlock: boolean): Promise<IPackage>;

  getAgentPackages(
    agentId: string,
    search: string,
    page: number,
    limit: number
  ): Promise<{
    packages: IPackage[];
    totalItems: number;
    totalPages: number;
    currentPage: number;
  }>;

  getSimilarPackages(packageId: string): Promise<IPackage[]>;

  updatePackageImage(image: Express.Multer.File | undefined, publicId: string): Promise<string>;

  deletePackageImage(publicId: string): Promise<void>;
}
