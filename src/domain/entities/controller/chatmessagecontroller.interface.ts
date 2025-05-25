import { Request, Response, NextFunction } from "express";

export default interface IChatmessageController {
  getContacts(req: Request, res: Response, next: NextFunction): Promise<Response|void> ;
  getChats(req: Request, res: Response, next: NextFunction): Promise<Response|void> ;
  getRoom(req: Request, res: Response, next: NextFunction): Promise<Response|void> ;
  getRoomMessage(req: Request, res: Response, next: NextFunction): Promise<Response|void> ;
}
