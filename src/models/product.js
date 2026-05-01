const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    productId: {
        type: Number
    },
    title: {
        type: String
    },
    price: {
        type: String
    },
    totalQuantity: {
        type: Number
    },
    cartCount: {
        type: Number
    }
})


const productModel = mongoose.model("Product", productSchema, "Products")

module.exports = productModel