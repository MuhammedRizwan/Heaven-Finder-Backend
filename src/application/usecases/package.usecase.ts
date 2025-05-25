import IPackageUsecaseDependencies from "../../domain/entities/depencies/packagedependencies.interface";
import IPackage from "../../domain/entities/model/package.interface";
import IPackageRepository from "../../domain/entities/repository/packagerepository.interface";
import HttpStatusCode from "../../domain/enum/httpstatus";
import CustomError from "../../domain/errors/customError";
import CloudinaryService from "../../frameworks/services/cloudinaryService";


export default class packageUseCase {
  private _packageRepository: IPackageRepository;
  private _cloudinaryService: CloudinaryService;
  constructor(dependencies: IPackageUsecaseDependencies) {
    this._packageRepository = dependencies.Repositories.PackageRepository;
    this._cloudinaryService = dependencies.Services.CloudinaryService;
  }
  async createPackage(
    package_data: IPackage,
    files:
      | { [fieldname: string]: Express.Multer.File[] }
      | Express.Multer.File[]
      | undefined
  ): Promise<IPackage> {
    if (Array.isArray(files)) {
      package_data.images = await Promise.all(
        files.map(async (image) => {
          const imageUrl = await this._cloudinaryService.uploadImage(image);
          return imageUrl;
        })
      );
    }
    const newPackage = await this._packageRepository.createPackage(package_data);
    if (!newPackage) {
      throw new CustomError("Package creation failed", HttpStatusCode.INTERNAL_SERVER_ERROR);
    }
    return newPackage;
  }
  async getPackage(id: string): Promise<IPackage> {
    const packageData = await this._packageRepository.getPackage(id);
    if (!packageData) {
      throw new CustomError("Package not found", HttpStatusCode.NOT_FOUND);
    }
    return packageData;
  }
  async getAllPackages(
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
  }> {
    const query: any = search
      ? { destinations: { $elemMatch: { $regex: search, $options: "i" } } }
      : {};
    if (categoryId) {
      query.category_id = categoryId;
    }

    if (days) {
      query.no_of_days = parseInt(days, 10);
    }
    if (startRange && endRange) {
      query.offer_price = {
        $gte: parseInt(startRange, 10),
        $lte: parseInt(endRange, 10),
      };
    } else if (startRange) {
      query.offer_price = { $gte: parseInt(startRange, 10) };
    } else if (endRange) {
      query.offer_price = { $lte: parseInt(endRange, 10) };
    }

    const packages = await this._packageRepository.getAllPackages(
      query,
      page,
      limit
    );
    if (!packages) {
      throw new CustomError("Package not found", HttpStatusCode.NOT_FOUND);
    }
    const totalItems = await this._packageRepository.packageCount(query);
    if (totalItems === 0) {
      throw new CustomError("Packages not found", HttpStatusCode.NOT_FOUND);
    }
    return {
      packages,
      totalItems,
      totalPages: Math.ceil(totalItems / limit),
      currentPage: page,
    };
  }
  async editPackage(
    id: string,
    packageData: IPackage,
    files:
      | { [fieldname: string]: Express.Multer.File[] }
      | Express.Multer.File[]
      | undefined
  ): Promise<IPackage> {
    packageData.offer_price = packageData.original_price
    const editedPackage = await this._packageRepository.editPackage(
      id,
      packageData
    );

    if (!editedPackage) {
      throw new CustomError("Package not found", HttpStatusCode.NOT_FOUND);
    }
    return editedPackage;
  }
  async blocknUnblockPackage(packageId: string, isBlock: boolean): Promise<IPackage> {
    const updatedPackage = await this._packageRepository.blockNUnblockPackage(
      packageId,
      isBlock
    );
    if (!updatedPackage) {
      throw new CustomError("Package not found", HttpStatusCode.NOT_FOUND);
    }
    return updatedPackage;
  }
  async getAgentPackages(
    agentId: string,
    search: string,
    page: number,
    limit: number
  ): Promise<{
    packages: IPackage[];
    totalItems: number;
    totalPages: number;
    currentPage: number;
  }> {
    const query = search
      ? { package_name: { $regex: search, $options: "i" } }
      : {};
    const packages = await this._packageRepository.getAgentPackages(
      agentId,
      query,
      page,
      limit
    );
    if (!packages) {
      throw new CustomError("Package not found", HttpStatusCode.NOT_FOUND);
    }
    const totalItems = await this._packageRepository.packageCount(query);
    if (totalItems === 0) {
      throw new CustomError("coupons not found", HttpStatusCode.NOT_FOUND);
    }

    return {
      packages,
      totalItems,
      totalPages: Math.ceil(totalItems / limit),
      currentPage: page,
    };
  }
  async getSimilarPackages(packageId: string): Promise<IPackage[]> {
    try {
      const packages = await this._packageRepository.getPackage(packageId);
      if (!packages) {
        throw new CustomError("Package not found", HttpStatusCode.NOT_FOUND);
      }
      const similarPackages = await this._packageRepository.getsimilarPackages(
        packages.offer_price
      );
      if (!similarPackages) {
        throw new CustomError("Similar packages not found", HttpStatusCode.NOT_FOUND);
      }
      return similarPackages;
    } catch (error) {
      throw error;
    }
  }
  async updatePackageImage(image: Express.Multer.File | undefined, publicId: string): Promise<string> {
    try {
      if (!image) {
        throw new CustomError("Image not found", HttpStatusCode.NOT_FOUND);
      }
      const imageUrl = await this._cloudinaryService.updateImage(image, publicId);
      if (!imageUrl) {
        throw new CustomError("Package not found", HttpStatusCode.NOT_FOUND);
      }
      return imageUrl;
    } catch (error) {
      throw error
    }
  }
  async deletePackageImage(publicId: string): Promise<void> {
    try {
      await this._cloudinaryService.deleteImage(publicId);
    } catch (error) {
      throw error;
    }
  }
}
