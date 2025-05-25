import ICategoryUsecaseDependencies from "../../domain/entities/depencies/categorydependencies.interface";
import ICategory from "../../domain/entities/model/category.interface";
import ICategoryRepository from "../../domain/entities/repository/categoryrepository.interface";
import ICategoryUseCase from "../../domain/entities/usecase/categoryusecase.interface";
import HttpStatusCode from "../../domain/enum/httpstatus";
import CustomError from "../../domain/errors/customError";
import CloudinaryService from "../../frameworks/services/cloudinaryService";


export default class CategoryUseCase implements ICategoryUseCase {
  private _categoryRepository: ICategoryRepository;
  private _cloudinaryService: CloudinaryService;
  constructor(dependencies: ICategoryUsecaseDependencies) {
    this._categoryRepository = dependencies.Repositories.CategoryRepository;
    this._cloudinaryService = dependencies.Services.CloudinaryService;
  }
  async createCategory(
    category: ICategory,
    file: { Document: Express.Multer.File | undefined }
  ): Promise<ICategory> {
    try {
      const isExist = await this._categoryRepository.findByCategoryName(
        category.category_name
      );
      if (isExist) {
        throw new CustomError("catagory Already Exist", HttpStatusCode.CONFLICT);
      }
      if (!file?.Document) {
        throw new CustomError("Document file is required", HttpStatusCode.BAD_REQUEST);
      }
      category.image = await this._cloudinaryService.uploadImage(file.Document);
      const createdCategory = await this._categoryRepository.createCategory(
        category
      );
      if (!createdCategory) {
        throw new CustomError("catagory Creation Failed", HttpStatusCode.INTERNAL_SERVER_ERROR);
      }
      return createdCategory;
    } catch (error) {
      throw error;
    }
  }
  async blocknUnblockCategory(id: string, is_block: boolean): Promise<ICategory> {
    try {
      const updatedCategory =
        await this._categoryRepository.blockNUnblockCategory(id, is_block);
      if (!updatedCategory) {
        throw new CustomError("catagory Updation Failed", HttpStatusCode.INTERNAL_SERVER_ERROR);
      }
      return updatedCategory;
    } catch (error) {
      throw error;
    }
  }
  async findAllCategory(
    search: string,
    page: number,
    limit: number,
    filter: string
  ): Promise<{
    categories: ICategory[];
    totalItems: number;
    totalPages: number;
    currentPage: number;
  }> {
    try {
      const query = search
        ? { category_name: { $regex: search, $options: "i" } }
        : {};
      const filterData =
        filter === "all"
          ? {}
          : { is_block: filter === "blocked" ? true : false };
      const categories = await this._categoryRepository.findAllCategory(
        query,
        page,
        limit,
        filterData
      );
      if (!categories) {
        throw new CustomError("catagory Not Found", HttpStatusCode.NOT_FOUND);
      }
      const totalItems = await this._categoryRepository.countDocument(
        query,
        filterData
      );
      if (totalItems === 0) {
        throw new CustomError("catagory Not Found", HttpStatusCode.NOT_FOUND);
      }
      return {
        categories,
        totalItems,
        totalPages: Math.ceil(totalItems / limit),
        currentPage: page,
      };
    } catch (error) {
      throw error;
    }
  }
  async updateCategory(
    id: string,
    catagory: ICategory,
    file: { Document: Express.Multer.File | undefined }
  ): Promise<ICategory> {
    try {
      const isExist = await this._categoryRepository.findCategoryById(id);
      if (!isExist) {
        throw new CustomError("catagory Not Found", HttpStatusCode.NOT_FOUND);
      }
      const nameExit = await this._categoryRepository.findByCategoryName(
        catagory.category_name
      );
      if (
        nameExit &&
        nameExit?._id != undefined &&
        nameExit._id.toString() !== id
      ) {
        throw new CustomError("catagory Already Exist", HttpStatusCode.CONFLICT);
      }
      if (file.Document) {
        catagory.image = await this._cloudinaryService.uploadImage(
          file.Document
        );
      }
      const updatedCategory = await this._categoryRepository.editCategory(
        id,
        catagory
      );
      if (!updatedCategory) {
        throw new CustomError("catagory Updation Failed", HttpStatusCode.INTERNAL_SERVER_ERROR);
      }
      return updatedCategory;
    } catch (error) {
      throw error;
    }
  }
  async getUnblockedCategories(): Promise<ICategory[]> {
    try {
      const categories =
        await this._categoryRepository.getUnblockedCategories();
      if (!categories) {
        throw new CustomError("catagory Not Found", HttpStatusCode.NOT_FOUND);
      }
      if (categories.length === 0) {
        throw new CustomError("catagory Not Found", HttpStatusCode.NOT_FOUND);
      }
      return categories;
    } catch (error) {
      throw error;
    }
  }
}
