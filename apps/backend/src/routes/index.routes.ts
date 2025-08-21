import express, { Router } from "express";
import { verifyUser } from "../middleware/auth.middleware";
import {
  enableAutomation,
  getUserData,
  getAutomation,
  updateInstaToken,
  getAutomationById,
  updateAutomation,
} from "../controllers/user.controller";

export const indexRouter: Router = Router();

indexRouter.get("/data", verifyUser, getUserData);
indexRouter.patch("/insta-token", verifyUser, updateInstaToken);
indexRouter.patch("/initialize-automation", verifyUser, enableAutomation);
indexRouter.get("/automation", verifyUser, getAutomation);
indexRouter.get("/automation/:id", verifyUser, getAutomationById);
indexRouter.patch("/automation/:id", verifyUser, updateAutomation);
