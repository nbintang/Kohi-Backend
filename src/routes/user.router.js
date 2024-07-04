import { router } from "../utils/routers.js";
import {
  createUserController,
  deleteUserController,
  getUserController,
  getUserIdController,
  patchUserController,
  putUserController,
} from "../controllers/user.controller.js";

router.get("/users", getUserController);
router.get("/users/:id", getUserIdController);
router.post("/users", createUserController);
router.put("/users/:id", putUserController);
router.patch("/users/:id", patchUserController)
router.delete("/users/:id", deleteUserController);

export default router;
