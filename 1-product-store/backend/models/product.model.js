import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    }
},{
    timestamps: true // createdAt, updatedAt
});

const Product = mongoose.model('Product', productSchema);
// mongoose turns "Product" into "products" collection

export default Product;
