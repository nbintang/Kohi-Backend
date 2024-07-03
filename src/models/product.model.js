import { prisma } from "../config/prisma.js";

export const getProductModel = async () => {
  const products = await prisma.product.findMany();
  return products;
};

export const createProductModel = async ({ name, description, price, image }) => {
  const newProducts = await prisma.product.create({
    data: {
      name,
      image,
      description,
      price,
    },
  });
  return newProducts;
};

export const getProductByIdModel = async (id) => {
    const findedProduct = await prisma.product.findUnique({
        where:{
           id: parseInt(id)
        }
    })

    return findedProduct;
}

export const putProductModel = async ({id ,name, description, price}) => {
    const findedProduct = await getProductByIdModel(id)
    const updateProduct =await prisma.product.update({
        where:{
        id: findedProduct.id
        },
        data: {
            name,
            description,
            price
        }
    });

    return updateProduct
}

export const deleteProductModel = async ({id}) => {
    const findedProduct = await getProductByIdModel(id);
    const deleteProduct = await prisma.product.delete({
        where:{
            id: findedProduct.id
        }
    })

    return deleteProduct
}