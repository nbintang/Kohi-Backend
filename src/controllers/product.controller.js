import {
  createProductModel,
  deleteProductModel,
  getProductByIdModel,
  getProductModel,
  putProductModel,
} from "../models/product.model.js";

export const getProductController = async (req, res) => {
  try {
    const products = await getProductModel();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getProductByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const findedProduct = await getProductByIdModel(id);
    res.send(findedProduct);
  } catch (error) {
    console.log(error);
  }
};

export const createProductController = async (req, res) => {
  try {
    const { name, description, price, image } = req.body;
    const newProducts = await createProductModel({
      name,
      description,
      price,
      image,
    });
    res.json({
      data: newProducts,
      message: "Product created successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

export const putProductController = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, image } = req.body;
    const updateProduct = await putProductModel({
      id,
      name,
      description,
      price,
      image,
    });
    res.json({
      data: updateProduct,
      message: "Product updated successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteProductController = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteProductModel({ id });
    res.json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.log(error);
  }
};
