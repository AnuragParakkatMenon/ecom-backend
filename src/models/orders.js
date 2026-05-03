const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    orderId: {
        type: String,
        required: true,
        unique: true
    },
    items: [
        {
            productId: Number,
            title: String,
            quantity: Number
        }
    ],
    shipTo: {
        name: String,
        address: String,
        city: String,
        pincode: String
    },
    orderStatus: {
        type: String,
        default: "PLACED"
    },
    placedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Orders", orderSchema, "Orders");