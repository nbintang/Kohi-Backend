import { refreshTokenController } from "../auth/refresh.token.controller.js";
import {
  loginUserController,
  logoutUserController,
  registerUserController,
} from "../auth/user.auth.js";
import { getUserController, getUserIdController } from "../controllers/user.controller.js";
import { userAuthMiddleware } from "../middleware/user.auth.middleware.js";
import { router } from "../utils/routers.js";

router.get("/auth/users", userAuthMiddleware, getUserController);
router.post("/auth/register", registerUserController);
router.post("/auth/login", loginUserController);
router.post("/auth/logout", logoutUserController);
router.get("/refresh-token", refreshTokenController);
router.get("/auth/users/:id", getUserIdController);
export default router;
