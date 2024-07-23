const express = require("express");
const app = express();
const PUERTO = 8080;
const productRouter = require("./routes/products.router.js");
const cartRouter = require("./routes/cart.router.js");

app.use(express.json());

//RUTAS
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);

app.listen(PUERTO, () => {
  console.log(`Escuchando en el http://localhost:${PUERTO}`);
});
