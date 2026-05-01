const express = require("express");

const { connectDB } = require("./config/database");
const Product = require("./models/product");

const router = express();

router.use(express.json())


//gets all product list
router.get("/api/products", async (req, res) => {
    try {
        const products = await Product.find()

        res.status(200).json({
            products: products
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server Error"
        });
    }
});

//Creates order after checkout
router.post("/api/createOrder", async (req, res) => {
    try {
        const { items } = req.body;

        for (const item of items) {
            const updatedProduct = await Product.findOneAndUpdate(
                {
                    productId: Number(item.productId),
                    totalQuantity: { $gte: item.quantity }
                },
                {
                    $inc: { totalQuantity: -item.quantity }
                },
                { new: true }
            );

            if (!updatedProduct) {
                return res.status(400).json({
                    message: `Product ${item.productId} not found or out of stock`
                });
            }

            console.log("UPDATED:", updatedProduct.title);
        }

        res.status(201).json({
            message: "Order created"
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server error"
        });
    }
});


// Db connection
connectDB()
    .then(() => {
        router.listen(7777, () => {
            console.log("Server running on port 7777");
        });
    })
    .catch((err) => {
        console.error("DB connection failed", err);
    });