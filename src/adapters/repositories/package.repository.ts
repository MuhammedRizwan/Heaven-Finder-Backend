import { FilterQuery } from "mongoose";
import Icategory from "../../domain/entities/model/category.interface";
import IPackage from "../../domain/entities/model/package.interface";
import packageModel from "../database/models/package.model";

export default class PackageRepository {
  async createPackage(package_data: IPackage): Promise<IPackage | null> {
    const packageDoc = await packageModel.create(package_data);
    const packageData = packageDoc.toObject() as unknown as IPackage;
    return packageData;
  }

  async getPackage(id: string): Promise<IPackage | null> {
    const packageData = await packageModel.findOne({ _id: id });
    if (!packageData) return null;
    return packageData as unknown as IPackage;
  }

  async getAllPackages(
    query: FilterQuery<IPackage>,
    page: number,
    limit: number
  ): Promise<IPackage[]> {
    const completedQuery = { ...query, is_block: false };
    const packages = await packageModel
      .find(completedQuery)
      .lean()
      .skip((page - 1) * limit)
      .limit(limit);
    return packages as unknown as IPackage[];
  }
  async editPackage(
    id: string,
    packageData: IPackage
  ): Promise<IPackage | null> {
    const updatedPackage: IPackage | null = await packageModel.findOneAndUpdate(
      { _id: id },
      { $set: packageData },
      { new: true }
    );
    return updatedPackage;
  }
  async blockNUnblockPackage(
    packageId: string,
    isBlock: boolean
  ): Promise<IPackage | null> {
    const updatedPackage: IPackage | null = await packageModel.findOneAndUpdate(
      { _id: packageId },
      { $set: { is_block: isBlock } },
      { new: true }
    );

    return updatedPackage;
  }
  async getAgentPackages(
    agentId: string,
    query: FilterQuery<IPackage>,
    page: number,
    limit: number
  ) {
    const completedQuery = { travel_agent_id: agentId, ...query };
    const Packages = await packageModel
      .find(completedQuery)
      .lean()
      .skip((page - 1) * limit)
      .limit(limit)
      .populate<{ category_id: Icategory }>("category_id")
      .sort({ createdAt: -1 });

    const formatted = Packages.map((pkg: any) => ({
      ...pkg,
      _id: String(pkg._id),
      travel_agent_id: String(pkg.travel_agent_id),
      category_id: {
        _id: String(pkg.category_id?._id),
        name: pkg.category_id?.name,
      },
    })) as IPackage[];

    return formatted;
  }
  async getsimilarPackages(offer_price: number): Promise<IPackage[] | null> {
    const minPrice = offer_price - 5000;
    const maxPrice = offer_price + 5000;

    const packages = await packageModel
      .find({
        offer_price: { $gte: minPrice, $lte: maxPrice },
      })
      .limit(4);

    return packages as unknown as IPackage[];
  }
  async packageCount(query: FilterQuery<IPackage>): Promise<number> {
    const totalItems = await packageModel.countDocuments({ ...query, is_block: false });
    return totalItems;
  }
  async addofferPackage(agentId: string): Promise<IPackage[] | null> {
    try {
      const packages: IPackage[] | null = await packageModel.find({
        travel_agent_id: agentId,
      });
      return packages;
    } catch (error) {
      throw error;
    }
  }
  async updateOfferPrice(packageId: string, offerPrice: number): Promise<void> {
    try {
      const updateOffer = await packageModel.updateOne(
        { _id: packageId },
        { $set: { offer_price: offerPrice } }
      );
    } catch (error) {
      throw error;
    }
  }
  async getAllPackageCount(): Promise<{
    packagecount: number;
    blockedpackage: number;
    unblockedpackage: number;
  }> {
    try {
      const packagecount = await packageModel.countDocuments();
      const blockedpackage = await packageModel.countDocuments({
        is_block: true,
      });
      const unblockedpackage = await packageModel.countDocuments({
        is_block: false,
      });
      return { packagecount, blockedpackage, unblockedpackage };
    } catch (error) {
      throw error;
    }
  }
  async getpackageCount(agentId: string): Promise<{
    packagecount: number;
    unblockedpackage: number;
  }> {
    try {
      const packagecount = await packageModel.countDocuments({
        travel_agent_id: agentId,
      });
      const unblockedpackage = await packageModel.countDocuments({
        travel_agent_id: agentId,
        is_block: false,
      });
      return { packagecount, unblockedpackage };
    } catch (error) {
      throw error;
    }
  }
}
