import { Router } from "express";
import { UserAPI } from "../controllers/userApi";

export const userRoutes = (router: Router) => {
  const userRouter: Router = Router();

  userRouter.post("/", UserAPI.create).get("/", UserAPI.findUser);

  router.use("/user", userRouter);
};
