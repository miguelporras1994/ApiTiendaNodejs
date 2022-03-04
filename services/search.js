const MongoLib = require('../lib/mongo')

class SearchService {


  constructor(){
    this.collection = 'products';
    this.monngoDB = new MongoLib();
  }



  async getSearch({ tags}) {
    const query = tags && { tags: { $in: tags}}
    console.log('servicio get productos')
    console.log(query)
    
    const search = await this.monngoDB.getAll(this.collection, query);
    console.log(search)
    return search || [];
  }

  async getSearchName( productName ) {
    console.log(productName + '   SERVICIO  ' )
    const product = await this.monngoDB.getSearch( this.collection, productName)
    return product || {};

  }
}
 

module.exports = SearchService;