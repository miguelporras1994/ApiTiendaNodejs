const MongoLib = require('../lib/mongo')

class ProductsService {


  constructor(){
    this.collection = 'products';
    this.monngoDB = new MongoLib();
  }



  async getProducts({ tags}) {
    const query = tags && { tags: { $in: tags}}
    console.log('servicio get productos')
    console.log(query)
    
    const products = await this.monngoDB.getAll(this.collection, query);
    console.log(products)
    return products || [];
  }

  async getProductsId( productId ) {
    console.log(productId + '   SERVICIO  ' )
    const product = await this.monngoDB.get( this.collection, productId)
    return product || {};
  }

  async createProducts(product) {
    console.log('el producto')
    console.log(product)
    const createProductId = await  this.monngoDB.create(this.collection,  product);
    return createProductId;
  }

  async updateProducts({ productId, product} = {}) {
    console.log(productId + '   SERVICIO  ' )
    console.log(product)
    

    const updatedProductId = await this.monngoDB.update(this.collection,productId,product);
    return updatedProductId;
  }

  async deleteProducts({productId}) {
    const deletedProductId = await this.monngoDB.delete(this.collection, productId);
    return deletedProductId || [];
  }
}

module.exports = ProductsService;