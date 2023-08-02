import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    product_id: {
        type: Number,
        required: [true, "Please provide an id"],
        unique: true,
    },
    product_name: {
        type: String,
        required: [true, "Please provide a product name"],
        unique: true,
    },
    product_desc: {
        type: String,
        required: [true, "Please provide a description"],
    },
    product_origin: {
        type: String,
        default: 'Unknown',
    },
    product_price: {
        type: Number,
        required: [true, "Please provide a price"],
    },
    product_quantity: {
        type: Number,
        required: [true, "Please provide a quantity"],
    }
})

const Product = mongoose.models.products || mongoose.model("products", productSchema);

export default Product;