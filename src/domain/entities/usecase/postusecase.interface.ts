import IPost from "../../../domain/entities/model/post.interface";

export default interface IPostUseCase {
  getAllPost(): Promise<IPost[]>;
  createPost(
    post: IPost,
    file?: { [fieldname: string]: Express.Multer.File[] } | Express.Multer.File[]
  ): Promise<IPost>;
  editPost(
    postId: string,
    post: IPost,
    file?: { [fieldname: string]: Express.Multer.File[] } | Express.Multer.File[]
  ): Promise<IPost>;
  userPost(userId: string): Promise<IPost[]>;
  getPost(postId: string): Promise<IPost>;
  addLike(postId: string, userId: string): Promise<IPost>;
  removeLike(postId: string, userId: string): Promise<IPost>;
  addComment(postId: string, userId: string, comment: string): Promise<IPost>;
  removeComment(postId: string, commentId: string): Promise<IPost>;
}
