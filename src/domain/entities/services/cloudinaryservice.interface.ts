
export default interface ICloudinaryService {
  uploadImage(file: Express.Multer.File | undefined): Promise<string>;
  uploadPDF(file: Express.Multer.File): Promise<string>;
  deleteImage(publicId: string): Promise<void>;
  updateImage(file: Express.Multer.File | undefined, oldPublicId: string): Promise<string>;
}



