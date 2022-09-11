import { Router } from "express";
import { UserThemeAPI } from "../controllers/userThemeApi";

export const userThemeRoutes = (router: Router) => {
  const userThemeRouter: Router = Router();

  userThemeRouter.post("/", UserThemeAPI.change).get("/", UserThemeAPI.findByUser);

  router.use("/user-theme", userThemeRouter);
};
