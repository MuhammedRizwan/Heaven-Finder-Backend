import { ObjectId } from "mongoose"

export default interface IOTP {
    _id?: ObjectId
    email: string,
    otp: string,
    created_at?: Date
}


