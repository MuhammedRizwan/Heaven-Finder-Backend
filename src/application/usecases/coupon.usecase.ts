import ICouponUsecaseDependencies from "../../domain/entities/depencies/coupondependencies.interface";
import ICoupon from "../../domain/entities/model/coupon.interface";
import ICouponRepository from "../../domain/entities/repository/couponrepository.interace";
import ICouponUseCase from "../../domain/entities/usecase/couponusecase.interface";
import HttpStatusCode from "../../domain/enum/httpstatus";
import CustomError from "../../domain/errors/customError";


export default class CouponUseCase implements ICouponUseCase{
  private _couponRepository: ICouponRepository;
  constructor(dependencies: ICouponUsecaseDependencies) {
    this._couponRepository = dependencies.Repositories.CouponRepository;
  }
  async createCoupon(coupon: ICoupon): Promise<ICoupon> {
    try {
      const couponExists = await this._couponRepository.getCouponByCode(
        coupon.coupon_code
      )
      if (couponExists) {
        throw new CustomError("coupon already exists", HttpStatusCode.CONFLICT)
      }
      const createdCoupon = await this._couponRepository.createCoupon(coupon);
      if (!createdCoupon) {
        throw new CustomError("coupon not created", HttpStatusCode.INTERNAL_SERVER_ERROR);
      }
      return createdCoupon;
    } catch (error) {
      throw error;
    }
  }

  async getCouponByCode(coupon_code: string): Promise<ICoupon | null> {
    try {
      const coupon = await this._couponRepository.getCouponByCode(coupon_code);
      if (!coupon) {
        throw new CustomError("coupon not found", HttpStatusCode.NOT_FOUND);
      }
      return coupon;
    } catch (error) {
      throw error;
    }
  }
  async getAllCoupons(search: string, page: number, limit: number, filter: string): Promise<{
    coupons: ICoupon[];
    totalItems: number;
    totalPages: number;
    currentPage: number;
  }> {
    try {
      const query = search
        ? { coupon_code: { $regex: search, $options: "i" } }
        : {};
      const filterData = filter === "all" ? {} : { is_active: filter === "blocked" ? false : true };
      const coupons = await this._couponRepository.getAllCoupons(
        query,
        page,
        limit,
        filterData
      );
      if (!coupons) {
        throw new CustomError("coupons not found", HttpStatusCode.NOT_FOUND);
      }
      const totalItems = await this._couponRepository.couponCount(query, filterData);
      if (totalItems === 0) {
        throw new CustomError("coupons not found", HttpStatusCode.NOT_FOUND);
      }

      return {
        coupons,
        totalItems,
        totalPages: Math.ceil(totalItems / limit),
        currentPage: page,
      };
    } catch (error) {
      throw error;
    }
  }

  async getCouponById(coupon_id: string): Promise<ICoupon | null> {
    try {
      const coupon = await this._couponRepository.getCouponById(coupon_id);
      if (!coupon) {
        throw new CustomError("coupon not found", HttpStatusCode.NOT_FOUND);
      }
      return coupon;
    } catch (error) {
      throw error;
    }
  }
  async editCoupon(coupon_id: string, coupon: ICoupon): Promise<ICoupon | null> {
    try {
      const couponData = await this._couponRepository.editCoupon(
        coupon_id,
        coupon
      );
      if (!couponData) {
        throw new CustomError("coupon not found", HttpStatusCode.NOT_FOUND);
      }
      return couponData;
    } catch (error) {
      throw error;
    }
  }
  async blockCoupon(
    coupon_id: string,
    is_active: boolean
  ): Promise<ICoupon | null> {
    try {
      const couponData = await this._couponRepository.blockCoupon(
        coupon_id,
        is_active
      );
      if (!couponData) {
        throw new CustomError("coupon not found", HttpStatusCode.NOT_FOUND);
      }
      return couponData;
    } catch (error) {
      throw error;
    }
  }
  async getUnblockedCoupons(): Promise<ICoupon[] | null> {
    try {
      const coupons = await this._couponRepository.getUnblockedCoupons();
      if (!coupons) {
        throw new CustomError("coupons not found", HttpStatusCode.NOT_FOUND);
      }
      return coupons;
    } catch (error) {
      throw error;
    }
  }
  async getUsedCoupons(coupon_id: string, user_id: string, totalPrice: number): Promise<number | void> {
    try {
      const coupon = await this._couponRepository.getCouponById(coupon_id);
      if (!coupon) {
        throw new CustomError("coupon not found", HttpStatusCode.NOT_FOUND);
      }
      if (coupon.valid_upto) {
        const currentDate = new Date();
        const valid_upto = new Date(coupon.valid_upto);
        if (currentDate > valid_upto) {
          throw new CustomError("coupon expired", HttpStatusCode.NOT_FOUND);
        }
        if (coupon.used_by.includes(user_id)) {
          throw new CustomError("coupon already used", HttpStatusCode.NOT_FOUND);
        }
        if (Number(coupon.min_amount) > totalPrice) {
          throw new CustomError("coupon min amount not reached", HttpStatusCode.NOT_FOUND);
        }
        let discountAmount = (totalPrice * Number(coupon.percentage)) / 100;
        if (discountAmount > Number(coupon.max_amount)) {
          discountAmount = Number(coupon.max_amount);
        }
        return discountAmount;
      }
    } catch (error) {
      throw error;
    }
  }
}
