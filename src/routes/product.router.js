import {
  createProductController,
  deleteProductController,
  getProductByIdController,
  getProductController,
  putProductController,
} from "../controllers/product.controller.js";
import { router } from "../utils/routers.js";

router.get("/products", getProductController);
router.get("/products/:id", getProductByIdController);
router.post("/products", createProductController);
router.put("/products/:id", putProductController);
router.delete("/products/:id", deleteProductController);

export default router;
