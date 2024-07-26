import { mongoose } from "mongoose";
export const { ObjectId } = mongoose.Types;

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  code: { type: String, required: true },
  brand: { type: String, required: true },
  category: { type: [String], required: true },
  price: {
    type: Number,
    required: true,
    min: [0, "Precio debe ser mayor a cero"],
    max: [999999999, "Precio excede el límite."]
  }
});

export const Product = mongoose.model("Product", productSchema);