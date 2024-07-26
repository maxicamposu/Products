import express from "express";
import { router as productsRouter } from "./router/products.js";
import "dotenv/config";
import "./config/db.js";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



const PORT = process.env.PORT ?? 9000;
app.listen(PORT, (err) => {
  console.log(
    err
      ? `Error launching server: ${err.message}`
      : `Server running on port http://127.0.0.1:${PORT} \n
    Ctrl + C to exit...`
  );
});

app.use("/api/products", productsRouter);
