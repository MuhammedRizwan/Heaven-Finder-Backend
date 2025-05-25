export default interface IWalletUseCase {
  getAllWallet(user_id: string): Promise<any>; // You can replace `any` with a specific Wallet type/interface if available
  checkBalance(user_id: string, amount: number): Promise<any>;
}
