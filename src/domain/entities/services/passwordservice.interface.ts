export default interface IPasswordService {
  passwordHash(password: string): Promise<string>;
  verifyPassword(password: string, userPassword: string): Promise<boolean>;
}