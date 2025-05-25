import { FilterQuery } from "mongoose";
import ICategory  from "../../domain/entities/model/category.interface";
import categoryModel from "../database/models/category.model";
import ICategoryRepository from "../../domain/entities/repository/categoryrepository.interface";

export default class CategoryRepository implements ICategoryRepository{
  async createCategory(category: ICategory): Promise<ICategory | null> {
    const createdCategory = await categoryModel.create(category);
    return createdCategory
      ? (createdCategory.toObject() as unknown as ICategory)
      : null;
  }
  async findCategoryById(id: string): Promise<ICategory | null> {
    const category: ICategory | null = await categoryModel.findOne({ _id: id });
    return category;
  }
  async findByCategoryName(category_name: string): Promise<ICategory | null> {
    const category: ICategory | null = await categoryModel.findOne({
      category_name: { $regex: new RegExp(`^${category_name}$`, 'i') },
    });
    return category;
  }
  async blockNUnblockCategory(id: string,is_block: boolean): Promise<ICategory | null> {
    return categoryModel.findOneAndUpdate(
      { _id: id },
      { $set: { is_block } },
      { new: true }
    );
  }

  async findAllCategory(query: FilterQuery<ICategory>, page: number, limit: number,filterData:object): Promise<ICategory[]> {
    const completedQuery = { ...query, ...filterData };
    const categories = await categoryModel.find(completedQuery).lean().skip((page - 1) * limit).limit(limit).sort({ createdAt: -1 });
    return categories.map((category) => ({ ...category, _id: category._id.toString() }));
  }

  async countDocument(query: FilterQuery<ICategory>,filterData:object): Promise<number> {
    const completedQuery = { ...query, ...filterData };
    return categoryModel.countDocuments(completedQuery);
  }
  async editCategory(
    id: string,catagory: ICategory
  ): Promise<ICategory | null> {
    const updatedCategory: ICategory | null = await categoryModel.findOneAndUpdate(
      { _id: id },
      { $set: catagory},
      { new: true }
    );
    return updatedCategory;
  }
  async getUnblockedCategories(): Promise<ICategory[] | null> {
    const categories = await categoryModel.find({is_block: false}).lean().sort({ createdAt: -1 });
    return categories.map((category) => ({ ...category, _id: category._id?.toString() }));
  }
}
