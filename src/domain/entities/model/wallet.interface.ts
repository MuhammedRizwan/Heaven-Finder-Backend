export default interface IWallet {
  _id: string;
  wallet_user: string;
  walletBalance: number;
  transaction: {
    bookingId: string;
    date: Date;
    amount: number;
    transactionType: "credit" | "debit";
    reason?: string | null;
  }[];
}
