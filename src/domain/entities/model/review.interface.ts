export default interface IReview {
    _id?: string;
    user_id: string;
    package_id: string;
    rating: number;
    feedback: string;
}