const express = require('express');
// const passport = require('passport');
const  ProductssService = require('../services/products');

const {
  // productIdSchema,
  createProductsSchema,
  // updateProductsSchema
} = require('../utils/schemas/products');

const validationHandler = require('../utils/middleware/validationHandler');
//  const scopesValidationHandler = require('../utils/middleware/scopesValidationHandler')

//stratagies of jwt 
// require('../utils/auth/strategies/jwt')


function ProductsApi(app){
    const router = express.Router();
    app.use("/api/products", router);

    const productsService = new ProductssService();

    router.get('/', 
    // passport.authenticate('jwt',{session: false}),
    // scopesValidationHandler(['read:products']),
      async function(req, res, next) {
      const { tags } = req.query;
           console.log("estoy llegando");
      try {
        // throw new Error("error products")
        const products = await productsService.getProducts({ tags });
  
        res.status(200).json({
          data: products,
          message: 'products listed'
        });
      } catch (err) {
        next(err);
      }
    });
  
    router.get(
      '/:productId',
      // passport.authenticate('jwt', {session: false}),
      // scopesValidationHandler(['read:products']),
      // validationHandler({ productId: productIdSchema }, 'params'),
      async function(req, res, next) {
        const { productId } = req.params;
          console.log(productId)
        try {
          const products = await productsService.getProductsId(productId);
  
          res.status(200).json({
            data: products,
            message: 'product retrieved'
          });
        } catch (err) {
          next(err);
        }
      }
    );
  
    router.post(
      '/', 
    // passport.authenticate('jwt', {session: false}),
    // scopesValidationHandler(['create:products']),
     validationHandler(createProductsSchema), async function(
      req,
      res,
      next
    ) {
      const { body: product } = req;
      try {
        console.log(product)
        const createdProductsId = await productsService.createProducts( product );
  
        res.status(201).json({
          data: createdProductsId,
          message: 'product created'
        });
      } catch (err) {
        next(err);
      }
    });
  
    router.put(
      '/:productId',
      // passport.authenticate('jwt', {session: false}),
      // scopesValidationHandler(['update:products']),
      // validationHandler({ productId: productIdSchema }, 'params'),
      // validationHandler(updateProductsSchema),
      async function(req, res, next) {
        
        const { productId } = req.params;
        const { body: product } = req;
  
        try {
          const updatedProductsId = await productsService.updateProducts({
            productId,
            product
          });
  
          res.status(200).json({
            data: updatedProductsId,
            message: 'product updated'
          });
        } catch (err) {
          next(err);
        }
      }
    );
  
    router.delete(
      '/:productId',
      // passport.authenticate('jwt', {session: false}),
      // scopesValidationHandler(['deleted:products']),
      // validationHandler({ productId: productIdSchema }, 'params'),
      async function(req, res, next) {
        const { productId } = req.params;
  
        try {
          const deletedProductsId = await productsService.deleteProducts({ productId });
  
          res.status(200).json({
            data: deletedProductsId,
            message: 'product deleted'
          });
        } catch (err) {
          next(err);
        }
      }
    );
   } 

module.exports = ProductsApi;
