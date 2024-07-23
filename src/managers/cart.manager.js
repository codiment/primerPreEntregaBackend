const fs = require("fs").promises;

class CartManager {
  constructor(path) {
    this.path = path;
    this.carts = [];
    this.ultId = 0;

    //cargar los carritos almacenados
    this.upCart();
  }

  //Crear dos funciones auxiliares para cargar y leer archivos

  async upCart() {
    try {
      const data = await fs.readFile(this.path, "utf-8");
      this.carts = JSON.parse(data);

      //Verifico que exista un elemento creado
      if (this.carts.length > 0) {
        //Utilizo el metodo map para crear un nuevo array que solo tenga los identificadores del carrito y con math.max obtengo el mayor
        this.ultId = Math.max(...this.carts.map((cart) => cart.id));
      }
    } catch (error) {
      console.log("Error al cargar el carrito");
      //Si no existe el archivo, lo voy a crear
      await this.saveCart();
    }
  }
  //guardo los datos del carrito en un array de objetos
  async saveCart() {
    await fs.writeFile(this.path, JSON.stringify(this.carts, null, 2));
  }

  //crear carrito
  async cartCreate() {
    const newCart = {
      id: ++this.ultId,
      products: [],
    };

    this.carts.push(newCart);

    //guardamos el array en el archivo
    await this.saveCart();
    return newCart;
  }

  //Obtener un carrito por id:
  async getCartById(cartId) {
    try {
      const cart = this.carts.find((c) => c.id == cartId);

      if (!cart) {
        throw new Error("No existe el carrito");
      }
      return cart;
    } catch (error) {
      console.log("Error al obtener el carrito por id");
      throw error;
    }
  }

  //Agregar productos al carrito

  async addCartProducts(cartId, productId, quantity = 1) {
    const cart = await this.getCartById(cartId);
    const productExists = cart.products.find((p) => p.product === productId);

    if (productExists) {
      productExists.quantity += quantity;
    } else {
      cart.products.push({ product: productId, quantity });
    }

    await this.saveCart();
    return cart;
  }
}

module.exports = CartManager;
