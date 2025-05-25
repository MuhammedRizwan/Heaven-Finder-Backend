import IWallet from "../model/wallet.interface";

export default interface IWalletRepository {
  refundWallet(
    bookingId: string,
    userId: string | undefined,
    amount: number,
    reason: string
  ): Promise<IWallet | null>;
  createWallet(user_id: string | undefined): Promise<void>;
  getWallet(user_id: string): Promise<IWallet | null>;
  addAdminWallet(
    bookingId: string,
    adminId: string,
    amount: number,
    reason: string
  ): Promise<IWallet | null>;
  debitWallet(
    bookingId: string,
    userId: string | undefined,
    amount: number,
    reason: string
  ): Promise<void>;
  WalletData(): Promise<
    {
      _id: number; // Month (1-12)
      totalTransactions: number;
    }[]
  >;
  getWalletData(agentId: string): Promise<
    {
      _id: number; // Month (1-12)
      totalTransactions: number;
    }[]
  >;
}