import { OrderBusiness } from "./business/orderBusiness.js"
import { Order } from "./entities/order.js"

const order = new Order({
  customerId: 1,
  amount: 1000,
  products: [{ description: "Ferrari" }]
})

const orderBusiness = new OrderBusiness()

console.info("Order created?", orderBusiness.create(order))
