import ICoupon from "../model/coupon.interface";

export default interface ICouponUseCase {
  createCoupon(coupon: ICoupon): Promise<ICoupon>;
  getCouponByCode(coupon_code: string): Promise<ICoupon | null>;
  getAllCoupons(
    search: string,
    page: number,
    limit: number,
    filter: string
  ): Promise<{
    coupons: ICoupon[];
    totalItems: number;
    totalPages: number;
    currentPage: number;
  }>;
  getCouponById(coupon_id: string): Promise<ICoupon | null>;
  editCoupon(coupon_id: string, coupon: ICoupon): Promise<ICoupon | null>;
  blockCoupon(coupon_id: string, is_active: boolean): Promise<ICoupon | null>;
  getUnblockedCoupons(): Promise<ICoupon[] | null>;
  getUsedCoupons(coupon_id: string, user_id: string, totalPrice: number): Promise<number | void>;
}
