import { prisma } from "../config/prisma.js"

export const getOrderItemModel = async () => {
    const orderItems = await prisma.orderItem.findMany();
    return orderItems;
}