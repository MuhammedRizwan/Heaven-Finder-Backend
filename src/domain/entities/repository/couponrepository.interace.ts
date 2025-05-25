import ICoupon from "../model/coupon.interface";

export default interface ICouponRepository {
    getCouponById(coupon_id: string | undefined): Promise<ICoupon | null>;
    adduserCoupon(
      coupon_id: string | undefined,
      user_id: string
    ): Promise<ICoupon | null>;
    createCoupon(coupon: ICoupon): Promise<ICoupon>;
    getCouponByCode(coupon_code: string): Promise<ICoupon | null>;
    getAllCoupons(
      query: object,
      page: number,
      limit: number,
      filterData:object
    ): Promise<ICoupon[] | null>;
    editCoupon(coupon_id: string, coupon: ICoupon): Promise<ICoupon | null>;
    blockCoupon(coupon_id: string, is_active: boolean): Promise<ICoupon | null>;
    couponCount(query: object,filterData:object): Promise<number>;
    getUnblockedCoupons(): Promise<ICoupon[] | null>;
  }