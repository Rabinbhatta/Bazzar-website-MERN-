import  {Orders}  from "../models/orders.js";

export const saveOrders = async (req, res) => {
    try {
      const { userId } = req.params
      const { order } = req.body
      const existingOrder = await Orders.findOne({ userId })
  
      if (!existingOrder) {
        const newOrder = Orders({ userId, orders:order })
        const savedOrder = await newOrder.save()
        return res.status(202).json(savedOrder.orders)
      } else {
        for (let i = 0; i < order.length; i++) {
          existingOrder.orders.push(order[i])
        }
        const savedOrder = await existingOrder.save()
        return res.status(202).json(savedOrder.orders)
      }
    } catch (err) {
      console.error(err)
      res.status(404).json({ error: 'An error occurred' })
    }
  }

  export const orders = async(req,res)=>{
    try {
        const {userId} = req.params
        const ordersResult = await Orders.find({userId})
        const orders = ordersResult.map(order => order.orders)
        if(!orders || !orders.length){
            res.status(404).json({message:"No orders found"})
        } else {
            res.status(200).json(orders)
        }
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}