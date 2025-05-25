import { Orders } from "razorpay/dist/types/orders";
import  IBooking  from "../model/booking.intrface";


export default interface IBookingUseCase {
  createBooking(booking: IBooking): Promise<IBooking | null>;

  getBooking(bookingId: string): Promise<IBooking | null>;

  getAgentBookings(
    agentId: string,
    packageId: string,
    search: string,
    page: number,
    limit: number
  ): Promise<{
    bookingData: IBooking[];
    totalItems: number;
    totalPages: number;
    currentPage: number;
  }>;

  getAdminBookings(
    search: string,
    page: number,
    limit: number
  ): Promise<{
    bookingData: IBooking[];
    totalItems: number;
    totalPages: number;
    currentPage: number;
  }>;

  createRazorpayOrder(amount: number): Promise<Orders.RazorpayOrder>;

  verifyRazorpayOrder(
    orderId: string,
    razorpayPaymentId: string,
    razorpaySignature: string
  ): Promise<string>;

  getTravelHistory(userId: string): Promise<IBooking[]>;

  cancelBooking(
    bookingId: string,
    cancellation_reason: string
  ): Promise<IBooking | null>;

  changeBookingStatus(
    bookingId: string,
    status: string,
    cancellation_reason: string
  ): Promise<IBooking | null>;

  changeTravelStatus(
    bookingId: string,
    travel_status: string
  ): Promise<IBooking | null>;

  getCompletedTravel(userId: string): Promise<IBooking[]>;

  getNewBooking(agentId: string): Promise<IBooking[]>;
}
