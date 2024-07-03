import { createOrderController, getOrderController } from "../controllers/order.controller.js";
import { router } from "../utils/routers.js";

router.get("/orders", getOrderController);
router.post("/orders", createOrderController);

export default router;
