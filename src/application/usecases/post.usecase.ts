import IPostUsecaseDependencies from "../../domain/entities/depencies/postdependencies.interface";
import IPost from "../../domain/entities/model/post.interface";
import IPostRepository from "../../domain/entities/repository/postrepository.interface";
import ICloudinaryService from "../../domain/entities/services/cloudinaryservice.interface";
import IPostUseCase from "../../domain/entities/usecase/postusecase.interface";
import HttpStatusCode from "../../domain/enum/httpstatus";
import CustomError from "../../domain/errors/customError";

export default class PostUseCase implements IPostUseCase {
  private _postRepository: IPostRepository;
  private _cloudinaryService: ICloudinaryService;
  constructor(dependencies: IPostUsecaseDependencies) {
    this._postRepository = dependencies.Repositories.PostRepository;
    this._cloudinaryService = dependencies.Services.CloudinaryService;
  }
  async getAllPost(): Promise<IPost[]> {
    try {
      const postData = await this._postRepository.getAllPost();
      if (postData.length == 0) {
        throw new CustomError("No post found", HttpStatusCode.NOT_FOUND);
      }
      return postData;
    } catch (error) {
      throw error;
    }
  }
  async createPost(
    post: IPost,
    file:
      | { [fieldname: string]: Express.Multer.File[] }
      | Express.Multer.File[]
      | undefined
  ): Promise<IPost> {
    try {
      if (Array.isArray(file)) {
        post.image = await Promise.all(
          file.map(async (image) => {
            const imageUrl = await this._cloudinaryService.uploadImage(image);
            return imageUrl;
          })
        );
      }
      const createdPost = this._postRepository.createPost(post);
      if (!createdPost) {
        throw new CustomError("couldn't create post", HttpStatusCode.NOT_FOUND);
      }
      return createdPost;
    } catch (error) {
      throw error;
    }
  }
  async editPost(
    postId: string,
    post: IPost,
    file:
      | { [fieldname: string]: Express.Multer.File[] }
      | Express.Multer.File[]
      | undefined
  ) : Promise<IPost>{
    try {
      if (Array.isArray(file)) {
        post.image = await Promise.all(
          file.map(async (image) => {
            const imageUrl = await this._cloudinaryService.uploadImage(image);
            return imageUrl;
          })
        );
      }
      const editedPost = this._postRepository.editPost(postId, post);
      if (!editedPost) {
        throw new CustomError("Cannot Edit Post", HttpStatusCode.INTERNAL_SERVER_ERROR);
      }
      return editedPost;
    } catch (error) {
      throw error;
    }
  }
  async userPost(userId: string): Promise<IPost[]> {
    try {
      const postData = await this._postRepository.userPost(userId);
      if (!postData) {
        throw new CustomError("cannot fetch post", HttpStatusCode.NOT_FOUND);
      }
      return postData;
    } catch (error) {
      throw error;
    }
  }
  async getPost(postId: string) : Promise<IPost>{
    try {
      const postData = await this._postRepository.getPost(postId);
      if (!postData) {
        throw new CustomError("cannot found Post", HttpStatusCode.INTERNAL_SERVER_ERROR);
      }
      return postData;
    } catch (error) {
      throw error;
    }
  }
  async addLike(postId: string, userId: string): Promise<IPost> {
    try {
      const postData = await this._postRepository.addLike(postId, userId);
      if (!postData) {
        throw new CustomError("cannot found Post", HttpStatusCode.INTERNAL_SERVER_ERROR);
      }
      return postData;
    } catch (error) {
      throw error;
    }
  }
  async removeLike(postId: string, userId: string): Promise<IPost> {
    try {
      const postData = await this._postRepository.removeLike(postId, userId);
      if (!postData) {
        throw new CustomError("cannot found Post", HttpStatusCode.INTERNAL_SERVER_ERROR);
      }
      return postData;
    } catch (error) {
      throw error;
    }
  }
  async addComment(postId: string,userId: string, comment: string ): Promise<IPost> {
    try {
      const postData = await this._postRepository.addComment(
        postId,
        userId,
        comment
      );
      if (!postData) {
        throw new CustomError("cannot found Post", HttpStatusCode.INTERNAL_SERVER_ERROR);
      }
      return postData;
    } catch (error) {
      throw error;
    }
  }
  async removeComment(postId: string, commentId: string): Promise<IPost> {
    try {
      const postData = await this._postRepository.removeComment(postId, commentId);
      if (!postData) {
        throw new CustomError("cannot found Post", HttpStatusCode.INTERNAL_SERVER_ERROR);
      }
      return postData;
    } catch (error) {
      throw error;
    }
  }
}
