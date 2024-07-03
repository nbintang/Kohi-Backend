import { createOrderModel, getOrderModel } from "../models/order.model.js";

export const getOrderController = async (req, res) => {
  try {
    const orders = await getOrderModel();
    res.json({
      data: orders,
    });
  } catch (error) {
    console.log(error);
  }
};

export const createOrderController = async (req, res) => {
    try {
        const {userId, totalAmount, orderItems} = req.body;
        const newOrders = await createOrderModel({
            userId,
            totalAmount,
            orderItems
        });
        res.json({
            data:newOrders
        })
    } catch (error) {
        console.log(error);
    }
}

