"use strict"
var Order = require('../models/Order');
var OrderItem = require('../models/OrderItem')
var OrderController = {
    saveOrder: (req, res) =>
    {
        let order = new Order();
        var params = req.body;
        order.client_id = params.client_id;
        order.value = params.value;
        order.creationDate = new Date();
        let items = params.items
    
        order.save((err, OrderSaved) => {
            if (err) {
                return res.status(500).send({ msg: 'Error in petition' })
            }
            if (!OrderSaved) {
                return res.status(404).send({ msg: 'Order could not be saved' })
            }
           
            items.forEach(item => {
                let newOrderItem = OrderItem()
                newOrderItem.order_id = orderSaved._id
                newOrderItem.product_id = item.product_id
                newOrderItem.amount = item.amount
                item = newOrderItem
            });
            OrderItem.insertMany(items,(err,orderItemSaved)=>{
                if (err) {
                    return res.status(500).send({ msg: 'Error in petition' })
                }
                if (!orderItemSaved) {
                    return res.status(404).send({ msg: 'Order could not be saved' })
                } 
                return res.status(200).send({ msg: 'Order created successfully',  ORDER: OrderSaved });
            });
        })

    },
    getOrder: function (req, res)
    
    {
        var id = req.params.id;

        if (!id) {
            return req.status(404).send({ message: 'Id was not provided' })
        }
        Order.findById(id ,async (err, order) => {
            if (err) {
                return res.status(500).send({ message: 'Error at returning the data.' });
            }

            if (!order) return req.status(404).send({ message: 'The order dont exist' })

            let itemlist = await OrderItem.findById(id,(err, orderItems)=>{
                if (err) {
                    return res.status(500).send({ message: 'Error at returning the data.' });
                }
            })
            return res.status(200).send({ORDER: order, ORDERITEMS:itemlist });

        })
    },
    getOrders: function(req,res){
        var client_id = req.params.id;
        Order.find({client_id:client_id}).exec((err, orders) => {
            if (err) {
                return res.status(500).send({ msg: "There has been an error loading the orders" });
            }
            if (!orders) {
                return res.status(404).send({ msg: "There is not orders" });
            }
            return res.status(200).send({ ORDERS: orders });
        });
    }
}
module.exports = OrderController
