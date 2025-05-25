import { FilterQuery, Types } from "mongoose";
import ICoupon from "../../domain/entities/model/coupon.interface";
import CustomError from "../../domain/errors/customError";
import couponModel from "../database/models/coupon.model";
import HttpStatusCode from "../../domain/enum/httpstatus";

export default class CouponRepository {
  async createCoupon(coupon: ICoupon): Promise<ICoupon> {
    const couponData: ICoupon = (
      await couponModel.create(coupon)
    ).toObject() as unknown as ICoupon;
    return couponData;
  }
  async getAllCoupons(query: FilterQuery<ICoupon>,page: number,limit: number,filterData:object): Promise<ICoupon[] | null> {
    try {
      const completedQuery={...query,...filterData}
      const coupons = await couponModel.find(completedQuery).skip((page - 1) * limit).limit(limit).sort({ createdAt: -1 });
      if (!coupons) {
        throw new CustomError("Coupons not found", HttpStatusCode.NOT_FOUND);
      }
      return coupons.map((coupon) => ({...coupon.toObject(),_id: coupon._id.toString(), used_by: coupon.used_by.map((id: Types.ObjectId) => id.toString()), }));
    } catch (error) {
      throw new CustomError("Failed to get coupons", HttpStatusCode.INTERNAL_SERVER_ERROR);
    }
  }
  async couponCount(query: FilterQuery<ICoupon>,filterData:object): Promise<number> {
    const completedQuery={...query,...filterData}
    return couponModel.countDocuments(completedQuery);
  }
  async getCouponByCode(coupon_code: string): Promise<ICoupon | null> {
    const coupon: ICoupon | null = await couponModel.findOne({ coupon_code });
    return coupon;
  }
  async getCouponById(coupon_id: string): Promise<ICoupon | null> {
    const coupon: ICoupon | null = await couponModel.findById(coupon_id);
    return coupon;
  }
  async editCoupon(coupon_id: string, coupon: ICoupon): Promise<ICoupon | null> {
    const updatedCoupon: ICoupon | null = await couponModel.findByIdAndUpdate(
      coupon_id,
      coupon,
      { new: true }
    );
    if (!updatedCoupon) {
      throw new CustomError(`Coupon with ID ${coupon_id} not found.`, HttpStatusCode.NOT_FOUND);
    }
    return updatedCoupon;
  }
  async blockCoupon(
    coupon_id: string,
    is_active: boolean
  ): Promise<ICoupon | null> {
    try {
      const updatedCoupon: ICoupon | null = await couponModel.findByIdAndUpdate(
        coupon_id,
        { is_active },
        { new: true }
      );
      if (!updatedCoupon) {
        throw new CustomError(`Coupon with ID ${coupon_id} not found.`, HttpStatusCode.NOT_FOUND);
      }

      return updatedCoupon;
    } catch (error) {
      throw new CustomError("Failed to update coupon", HttpStatusCode.INTERNAL_SERVER_ERROR);
    }
  }
  async getUnblockedCoupons(): Promise<ICoupon[] | null> {
    try {
      const coupons: ICoupon[] = await couponModel.find({ is_active: true });  
      return coupons;
    } catch (error) {
      throw error;
    }
  }

  async adduserCoupon(coupon_id: string, user_id: string): Promise<ICoupon | null> {
    try {
      const updatedCoupon: ICoupon | null = await couponModel.findByIdAndUpdate(
        coupon_id,
        { $push: { used_by: new Types.ObjectId(user_id) } },
        { new: true }
      );
      if (!updatedCoupon) {
        throw new CustomError(`Coupon with ID ${coupon_id} not found.`, HttpStatusCode.NOT_FOUND);
      }
      return updatedCoupon;
    } catch (error) {
      throw error
    }
  }
}
