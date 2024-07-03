import { router } from "../utils/routers.js";
import {
  createUserController,
  deleteUserController,
  getUserController,
  getUserIdController,
  putUserController,
} from "../controllers/user.controller.js";

router.get("/users", getUserController);
router.get("/users/:id", getUserIdController);
router.post("/users", createUserController);
router.put("/users/:id", putUserController);
router.delete("/users/:id", deleteUserController);

export default router;
