import { Request, Response, NextFunction } from "express";

export default interface IBookingController {
  createBooking(req: Request, res: Response, next: NextFunction):Promise<Response|void> ;
  getBooking(req: Request, res: Response, next: NextFunction):Promise<Response|void> ;
  getAgentBookings(req: Request, res: Response, next: NextFunction):Promise<Response|void> ;
  getAdminBookings(req: Request, res: Response, next: NextFunction):Promise<Response|void> ;
  createOrder(req: Request, res: Response, next: NextFunction):Promise<Response|void> ;
  verifyOrder(req: Request, res: Response, next: NextFunction):Promise<Response|void> ;
  getTravelHistory(req: Request, res: Response, next: NextFunction):Promise<Response|void> ;
  cancelBooking(req: Request, res: Response, next: NextFunction):Promise<Response|void> ;
  changeStatus(req: Request, res: Response, next: NextFunction):Promise<Response|void> ;
  changeTravelStatus(req: Request, res: Response, next: NextFunction):Promise<Response|void> ;
  completedTravel(req: Request, res: Response, next: NextFunction):Promise<Response|void> ;
  getNewBooking(req: Request, res: Response, next: NextFunction):Promise<Response|void> ;
}
