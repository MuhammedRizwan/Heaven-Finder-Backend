export default interface IJwtService {
  verifyRefreshToken(refreshToken: string): any;
  generateAccessToken(userId: string | undefined): string;
  generateRefreshToken(userId: string | undefined): string;
}