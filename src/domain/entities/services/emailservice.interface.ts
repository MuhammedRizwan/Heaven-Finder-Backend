export default interface IEmailService {
  sendVerificationEmail(email: string, otp: string): Promise<void>;
  sendAcceptanceEmail(email: string): Promise<void>;
  sendRejectionEmail(email: string): Promise<void>;
}