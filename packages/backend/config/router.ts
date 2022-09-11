import { Router } from "express";
import { themesRoutes } from "../routers/theme.routes";
import { userRoutes } from "../routers/user.routes";
import { userThemeRoutes } from "../routers/userTheme.routes";

const router: Router = Router();

//appRoutes(router);
//staticRoutes(router);
//userThemeRoutes(router);
themesRoutes(router);
userRoutes(router);
userThemeRoutes(router);
//healthRoutes(router);
//dadataRoutes(router);

export default router;
