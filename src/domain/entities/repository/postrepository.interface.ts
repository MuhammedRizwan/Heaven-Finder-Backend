import IPost from "../model/post.interface";

export default interface IPostRepository {
    getAllPost(): Promise<IPost[]>;
    createPost(post: IPost): Promise<IPost>;
    editPost(postId: string, post: IPost): Promise<IPost>;
    userPost(userId: string): Promise<IPost[]>;
    getPost(postId: string): Promise<IPost>;
    addLike(postId: string, userId: string): Promise<IPost>;
    removeLike(postId: string, userId: string): Promise<IPost>;
    addComment(postId: string, userId: string, comment: string): Promise<IPost>;
    removeComment(postId: string, commentId: string): Promise<IPost>;
}