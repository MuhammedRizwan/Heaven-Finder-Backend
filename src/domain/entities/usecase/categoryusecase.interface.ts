import ICategory from "../model/category.interface";

export default interface ICategoryUseCase {
  createCategory(
    category: ICategory,
    file: { Document: Express.Multer.File | undefined }
  ): Promise<ICategory>;

  blocknUnblockCategory(id: string, is_block: boolean): Promise<ICategory>;

  findAllCategory(
    search: string,
    page: number,
    limit: number,
    filter: string
  ): Promise<{
    categories: ICategory[];
    totalItems: number;
    totalPages: number;
    currentPage: number;
  }>;

  updateCategory(
    id: string,
    category: ICategory,
    file: { Document: Express.Multer.File | undefined }
  ): Promise<ICategory>;

  getUnblockedCategories(): Promise<ICategory[]>;
}
