import { getAllOrderItemController } from "../controllers/order-item.controller.js";
import { router } from "../utils/routers.js";
router.get("/order-items", getAllOrderItemController);
export default router;
