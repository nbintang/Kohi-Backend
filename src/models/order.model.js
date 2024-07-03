import { prisma } from "../config/prisma.js";

export const getOrderModel = async () => {
  const orders = await prisma.order.findMany({
    include: {
      user: true,
      orderItems: {
        include: {
          product: true,
        },
      },
    },
  });
  return orders;
};

export const createOrderModel = async ({ userId, totalAmount, orderItems }) => {
  const newOrders = await prisma.order.create({
    data: {
      userId,
      totalAmount,
      orderItems: {
        createMany: {
          data: orderItems.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
    },
    include: {
      orderItems: true,
    },
  });
  return newOrders;
};
