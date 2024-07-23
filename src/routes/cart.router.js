const express = require("express");
const router = express.Router();
const CartManager = require("../managers/cart.manager");
const cartManager = new CartManager("./src/data/carts.json");

//Creamos el carrito.

router.post("/", async (req, res) => {
  try {
    const newCartRouter = await cartManager.cartCreate();
    res.json(newCartRouter);
  } catch (error) {
    res.status(500).send("Error en el servidor");
  }
});

//Listamos los productos.

router.get("/:cid", async (req, res) => {
  let cartId = parseInt(req.params.cid);
  try {
    const cartMin = await cartManager.getCartById(cartId);
    res.json(cartMin.products);
  } catch (error) {
    res.status(500).send("Error al obtener el producto del carrito");
  }
});

//Agregar productos al carrito.

router.post("/:cid/product/:pid", async (req, res) => {
  let cartId = parseInt(req.params.cid);
  let productId = req.params.pid;
  let quantity = req.body.quantity || 1;

  try {
    const upAddProduct = await cartManager.addCartProducts(
      cartId,
      productId,
      quantity
    );
    res.json(upAddProduct.products);
  } catch (error) {
    res.status(500).send("Error al agregar un producto");
  }
});

module.exports = router;
