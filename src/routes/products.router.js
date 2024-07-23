const express = require("express");
const router = express.Router();
const ProductManager = require("../managers/product.manager.js");
const manager = new ProductManager("./src/data/productos.json");

//Obtengo todos los productos del JSON
router.get("/", async (req, res) => {
  const limit = req.query.limit;

  try {
    const arrayProductos = await manager.getProducts();
    if (limit) {
      res.send(arrayProductos.slice(0, limit));
    } else {
      res.send(arrayProductos);
    }
  } catch (error) {
    res.status(500).send("Error interno del servidor");
  }
});

//Obtngo un producto por ID
router.get("/:pid", async (req, res) => {
  let id = req.params.pid;

  try {
    const producto = await manager.getProductsById(parseInt(id));

    if (!producto) {
      res.send("producto no encontrado");
    } else {
      res.send(producto);
    }
  } catch (error) {
    res.status(500).json({ error: "Problema al obtener un producto" });
  }
});

//Agrego un producto nuevo
router.post("/", async (req, res) => {
  const nuevoProducto = req.body;

  try {
    await manager.addProduct(nuevoProducto);

    res.status(201).send("Producto agregado correctamente");
  } catch (error) {
    res.status(500).json({ error: "problema al agregar un producto" });
  }
});

//Actualizo por ID
router.put("/:pid", async (req, res) => {
  const id = req.params.pid;
  const updateProduct2 = req.body;

  try {
    await manager.updateProduct(parseInt(id), updateProduct2);
    res.json({ message: "Producto actualizado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Problema al actualizar el producto" });
  }
});

//Elimino producto
router.delete("/:pid", async (req, res) => {
  const id = req.params.pid;

  try {
    await manager.deleteProduct(parseInt(id));
    res.json({ message: "Producto eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Problema al eliminar el producto" });
  }
});

module.exports = router;
