import { NextFunction, Request, Response, Router } from "express";
import walletController from "../../../../adapters/controllers/wallet.controller";
import WalletDependencies from "../../../dependancies/wallet.dependencies";

const router = Router();

const controller = {
  wallet: new walletController(WalletDependencies),
};

router.get("/:userId", (req: Request, res: Response, next: NextFunction) =>
  controller.wallet.getAllWallet(req, res, next)
);
router.post('/check-balance', (req: Request, res: Response, next: NextFunction) =>
  controller.wallet.checkBalance(req, res, next)
);

export default router;
