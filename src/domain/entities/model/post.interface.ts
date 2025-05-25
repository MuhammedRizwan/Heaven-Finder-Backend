import { Types } from "mongoose";


interface ILike {
  liked_user: string; 
  emoji?: string; 
  created_At?: Date; 
}

interface IComment {
  user_id: string;
  message: string;
  created_At?: Date; 
}


export default interface IPost {
  _id?: string; 
  user_id: string;
  image?: string[]; 
  caption: string; 
  location: string;
  like: ILike[]; 
  comment: IComment[]; 
  createdAt?: Date; 
  updatedAt?: Date; 
}
