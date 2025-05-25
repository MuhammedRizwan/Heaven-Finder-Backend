import { FilterQuery } from "mongoose";
import IPackage from "../model/package.interface";

interface PackageQuery {
  $or?:
    | { package_name: { $regex: string; $options: string } }[]
    | { destinations: { $regex: string; $options: string } }[];
  category_id?: string;
  no_of_days?: string;
  price?: { $gte?: number; $lte?: number };
}


export default interface IPackageRepository {
  createPackage(package_data: IPackage): Promise<IPackage | null>;
  getPackage(id: string): Promise<IPackage | null>;
  getAllPackages(
    query: FilterQuery<IPackage>,
    page: number,
    limit: number
  ): Promise<IPackage[]>;
  editPackage(id: string, packageData: IPackage): Promise<IPackage | null>;
  blockNUnblockPackage(
    packageId: string,
    isBlock: boolean
  ): Promise<IPackage | null>;
  getAgentPackages(
    agentId: string,
    query: FilterQuery<IPackage>,
    page: number,
    limit: number
  ): Promise<IPackage[]>;
  getsimilarPackages(offer_price: number): Promise<IPackage[] | null>;
  packageCount(query: FilterQuery<IPackage>): Promise<number>;
  addofferPackage(agentId: string): Promise<IPackage[] | null>;
  updateOfferPrice(
    package_id: string | undefined,
    offerPrice: number
  ): Promise<void>;
  getAllPackageCount(): Promise<{
    packagecount: number;
    blockedpackage: number;
    unblockedpackage: number;
  }>;
  getpackageCount(agentId: string): Promise<{
    packagecount: number;
    unblockedpackage: number;
  }>;
}
