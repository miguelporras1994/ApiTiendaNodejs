const joi = require('@hapi/joi');

const productsIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);
const productsTitleSchema = joi.string().max(80);
const productsDescriptionSchema = joi.string().max(500);
const productsPriceSchema = joi
  .number()
  .min(1)
  const productsUrlimgionSchema = joi.string().max(600);
 


const createProductsSchema = {
  title: productsTitleSchema.required(),
  description: productsDescriptionSchema.required(),
  price: productsPriceSchema.required(),
  ulrpicture:productsUrlimgionSchema.required(),
 
};

const updateProductsSchema = {
  title: productsTitleSchema,
  description: productsDescriptionSchema,
  price: productsPriceSchema
};

module.exports = {
  productsIdSchema,
  createProductsSchema,
  updateProductsSchema
};