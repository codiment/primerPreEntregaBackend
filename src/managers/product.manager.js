const fs = require("fs").promises;

class ProductManager {
  static ultId = 0;
  constructor(path) {
    this.products = [];
    this.path = path;
  }

  async addProduct({ title, description, price, img, code, stock }) {
    //CONSIDERAR
    const arrayProductos = await this.leerArchivo();
    //CONSIDERAR
    //PASO 1
    if (!title || !description || !price || !img || !code || !stock) {
      console.log("Todos los campos son obligatorios");
      return;
    }

    //PASO 2
    if (this.products.some((item) => item.code === code)) {
      console.log("El codigo debe ser unico.. o todos moriremos");
      return;
    }

    //PASO 3
    const nuevoProducto = {
      id: ++ProductManager.ultId,
      title,
      description,
      price,
      img,
      code,
      stock,
    };

    //PASO 4
    this.products.push(nuevoProducto);

    //PASO 5
    await this.guardarArchivo(this.products);
  }

  async getProducts() {
    try {
      const arrayProductos = await this.leerArchivo();
      return arrayProductos;
    } catch (error) {
      console.log("Error al leer el archivo", error);
    }
  }

  async getProductsById(id) {
    try {
      const arrayProductos = await this.leerArchivo();
      const buscado = arrayProductos.find((item) => item.id === id);

      if (!buscado) {
        console.log("Producto no encontrado");
        return null;
      } else {
        console.log("Producto encontrado");
        return buscado;
      }
    } catch (error) {
      console.log("Error al buscar por id", error);
    }
  }

  async leerArchivo() {
    const respuesta = await fs.readFile(this.path, "utf-8");
    const arrayProductos = JSON.parse(respuesta);
    return arrayProductos;
  }

  async guardarArchivo(arrayProductos) {
    await fs.writeFile(this.path, JSON.stringify(arrayProductos, null, 2));
  }

  async updateProduct(id, productoActualizado) {
    try {
      const arrayProductos = await this.leerArchivo();

      const index = arrayProductos.findIndex((item) => item.id === id);

      if (index !== -1) {
        arrayProductos[index] = {
          ...arrayProductos[index],
          ...productoActualizado,
        };
        await this.guardarArchivo(arrayProductos);
        console.log("Producto actualizado");
      } else {
        console.log("No se encuentra el producto");
      }
    } catch (error) {
      console.log("Tenemos un error al actualizar productos");
    }
  }

  async deleteProduct(id) {
    try {
      const arrayProductos = await this.leerArchivo();

      const index = arrayProductos.findIndex((item) => item.id === id);

      if (index !== -1) {
        arrayProductos.splice(index, 1);
        await this.guardarArchivo(arrayProductos);

        console.log("Producto eliminado");
      } else {
        console.log("No se encuentra el producto");
      }
    } catch (error) {
      console.log("Tenemos un error al actualizar productos");
    }
  }
}

module.exports = ProductManager;
