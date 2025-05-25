import { NextFunction, Request, Response, Router } from "express";
import NotificationController from "../../../../adapters/controllers/notification.controller";
import NotificationDependencies from "../../../dependancies/notification.dependencies";

const router = Router();

const controller = {
  notification: new NotificationController(NotificationDependencies),
};

router.get("/agent/:agentId", (req: Request, res: Response, next: NextFunction) =>
  controller.notification.getAgentNotifications(req, res, next)
);
router.get("/user/:userId", (req: Request, res: Response, next: NextFunction) =>
  controller.notification.getUserNotifications(req, res, next)
);
router.get("/admin/:adminId", (req: Request, res: Response, next: NextFunction) =>
  controller.notification.getAdminNotifications(req, res, next)
);

export default router;