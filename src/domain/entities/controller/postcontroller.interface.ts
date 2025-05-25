import { Request, Response, NextFunction } from "express";

export default interface IPostController {
    getAllPost(req: Request, res: Response, next: NextFunction):Promise<Response|void> ;
    createPost(req: Request, res: Response, next: NextFunction):Promise<Response|void> ;
    editPost(req: Request, res: Response, next: NextFunction):Promise<Response|void> ;
    userPost(req: Request, res: Response, next: NextFunction):Promise<Response|void> ;
    getPost(req: Request, res: Response, next: NextFunction):Promise<Response|void> ;
    addLike(req: Request, res: Response, next: NextFunction):Promise<Response|void> ;
    removeLike(req: Request, res: Response, next: NextFunction):Promise<Response|void> ;
    addComment(req: Request, res: Response, next: NextFunction):Promise<Response|void> ;
    removeComment(req: Request, res: Response, next: NextFunction):Promise<Response|void> ;
}
