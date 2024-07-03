import { getOrderItemModel } from "../models/order-item.model.js"

export const getAllOrderItemController =async (req, res) => {
    try {
        const orderItems = await 
        getOrderItemModel();
        res.json({
            data: orderItems
        })
    } catch (error) {
        console.log(error);
    }
}