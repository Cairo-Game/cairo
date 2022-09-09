import { Router } from "express";
import { themesRoutes } from "../routers/theme.routes";

const router: Router = Router();

//appRoutes(router);
//staticRoutes(router);
//userThemeRoutes(router);
themesRoutes(router);
//healthRoutes(router);
//dadataRoutes(router);

export default router; 