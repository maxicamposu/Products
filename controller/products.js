import { Product } from "../model/mongoDB/products.js";

export const productController = {
  async getAll(req, res) {
    const productCollection = await Product.find();
    productCollection
      ? res.status(200).json({
          success: true,
          message: "Catalogo de Productos",
          data: productCollection,
        })
      : res
          .status(404)
          .json({ success: false, message: "No se encontraron productos en BD" });
  },
  async getById(req, res) {
    let productId = req.params.id;

    try {
      let r = await Product.findById(productId);
      if (r == null){
        res.status(404).send({success: true, message: 'No se ha encontrado un producto con ese id.'})

      } else {
        res.status(200).send({success: true, message: 'Detalle del producto.',data: r})
      }

    } catch (err) {
        res.status(400).json({ success: false, message: `Error en búsqueda por ID: ${err.message}` });
      }

  },
  async getByName(req, res) {
    
    try {
      // Obtener parámetros de consulta
      const { name, brand } = req.query;
  
      // Construir el filtro de búsqueda
      let filter = {};
      if (name) filter.name = name;
      if (brand) filter.brand = brand;
  
      // Consultar usuarios en la base de datos
      const products = await Product.find(filter);
  
      // Enviar respuesta
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
    



  },
  async uptadeProduct(req, res) {
    let productId = req.params.id;
    let update = req.body;

    try {
      let r = await Product.findByIdAndUpdate(productId, update);
      if (r == null){
        res.status(404).send({status:true, message: 'No se ha encontrado un producto con ese id.'})

      } else {
        res.status(200).send({status:true, message: 'El producto ha sido actualizado.', data:r})
      }

    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
      }
    
  },
  async createProduct(req, res) {
    const { name, code, brand, category, price } = req.body;
    const newProduct = new Product({
      name,
      code,
      brand,
      category,
      price
    });
    try {
      await newProduct.save();
      res.status(200).json({ success: true, data: newProduct });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  },
  async deleteOne(req, res) {
    let productId = req.params.id;

    // console.log(req.params.Id);
    // let productId = req.params.Id;
    // Product.findById(productId, (err, product) => {
    //   if (err) res.status(500).send({message: `Error al borrar el producto: ${err}`})

    //   product.remove(err => {
    //     if (err) res.status(500).send({message: `Error al borrar el producto: ${err}`})
    //     res.status(200).send({message: 'El producto ha sido eliminado.'})      
      


    //   })
    // })
  
    try {
      let r = await Product.findByIdAndDelete(productId);
      if (r == null){
        res.status(404).send({status:true, message: 'No se ha encontrado un producto con ese id.'})

      } else {
        res.status(200).send({status:true, message: 'El producto ha sido eliminado.'})

      }
    
      
    } catch (err) {
      res.status(308).json({ success: false, message: err.message });
    }
  }
  
};
