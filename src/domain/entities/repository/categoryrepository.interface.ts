import ICategory from "../model/category.interface";

export default interface ICategoryRepository {
    createCategory(category: ICategory): Promise<ICategory | null>;
    findByCategoryName(category_name: string): Promise<ICategory | null>;
    blockNUnblockCategory(
      id: string,
      is_block: boolean
    ): Promise<ICategory | null>;
    findAllCategory(query:object,page:number,limit:number,filterData:object): Promise<ICategory[]>;
    editCategory(id: string, catagory: ICategory): Promise<ICategory | null>;
    countDocument(query:object,filterData:object): Promise<number>;
    findCategoryById(id: string): Promise<ICategory | null>;
    getUnblockedCategories(): Promise<ICategory[] | null>;
  }