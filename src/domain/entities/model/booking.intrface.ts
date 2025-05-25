import { ObjectId } from "mongoose";
import IUser from "./user.interface";
import IAgent from "./agent.interface";
import IPackage from "./package.interface";
import IReview from "./review.interface";
import { Orders } from "razorpay/dist/types/orders";


export default interface IBooking {
  _id?: ObjectId;
  user_id: string | IUser;
  travel_agent_id: string | IAgent;
  package_id: string | IPackage;
  bill_details: {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    address: string;
  };
  members: { name: string; age: number }[];
  payment_amount: number;
  payment_status: "pending" | "paid" | "refunded";
  booking_status: "pending" | "confirmed" | "canceled";
  travel_status: "pending" | "on-going" | "completed" | "canceled";
  payment_method: "razorpay" | "wallet";
  coupon_id?: string;
  start_date: string;
  booking_date: string;
  review_id?: string | IReview;
  cancellation_reason?: string;
}


export interface IRazorPay {
  createRazorpayOrder(amount: number): Promise<Orders.RazorpayOrder>;
  verifyRazorpayOrder(
    orderId: string,
    razorpayPaymentId: string,
    razorpaySignature: string
  ): Promise<string>;
}



