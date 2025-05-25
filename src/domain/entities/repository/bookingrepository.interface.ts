import IBooking from "../model/booking.intrface";

export default interface IBookingRepository {
  createBooking(booking: IBooking): Promise<IBooking | null>;
  getBooking(bookingId: string): Promise<IBooking | null>;
  getAgentBooking(
    query: object,
    page: number,
    limit: number
  ): Promise<IBooking[] | null>;
  getAdminBookings(
    query: object,
    page: number,
    limit: number
  ): Promise<IBooking[] | null>;
  countDocument(query: object): Promise<number>;
  countDocumentAgent(agentId: string): Promise<number>;
  getTravelHistory(userId: string): Promise<IBooking[] | null>;
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
  getCompletedTravel(userId: string): Promise<IBooking[] | null>;
  addReview(
    bookingId: string,
    reviewId: string | undefined
  ): Promise<IBooking | null>;
  deleteReview(bookingId: string): Promise<IBooking | null>;
  getAllBookingsCount(): Promise<{
    bookingcount: number;
    completedbooking: number;
    ongoingbooking: number;
    pendingbooking: number;
    cancelbooking: number;
  }>;
  getAgentBookingData(agentId: string): Promise<{
    totalbooking: number;
    completed: number;
    ongoing: number;
    pending: number;
    cancel: number;
  }>;
  getAgentBookingRevenue(agentId: string): Promise<number>;
  gookingData(): Promise<
    {
      _id: number; // Month (1-12)
      totalBookings: number;
    }[]
  >;
  agentBookings(agentId: string): Promise<
    {
      _id: number; // Month (1-12)
      totalBookings: number;
    }[]
  >;
  getNewBooking(agentId: string): Promise<IBooking[] | null>;
}
