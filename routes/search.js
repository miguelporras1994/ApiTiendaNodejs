const express = require('express');
// const passport = require('passport');
const  SearchsService = require('../services/search');

// const {
//   // searchIdSchema,
//   createSearchSchema,
//   // updateSearchSchema
// } = require('../utils/schemas/search');

// const validationHandler = require('../utils/middleware/validationHandler');
//  const scopesValidationHandler = require('../utils/middleware/scopesValidationHandler')

//stratagies of jwt 
// require('../utils/auth/strategies/jwt')


function SearchApi(app){
    const router = express.Router();
    app.use("/api/search", router);

    const searchService = new SearchsService();

    router.get('/', 
    // passport.authenticate('jwt',{session: false}),
    // scopesValidationHandler(['read:search']),
      async function(req, res, next) {
      const { tags } = req.query;
           console.log("estoy llegando");
      try {
        // throw new Error("error search")
        const search = await searchService.getSearch({ tags });
  
        res.status(200).json({
          data: search,
          message: 'search listed'
        });
      } catch (err) {
        next(err);
      }
    });
  
    router.get(
      '/:searchName',
      // passport.authenticate('jwt', {session: false}),
      // scopesValidationHandler(['read:search']),
      // validationHandler({ searchId: searchIdSchema }, 'params'),
      async function(req, res, next) {
        const { searchName } = req.params;
          console.log(searchName)
        try {
          const search = await searchService.getSearchName(searchName);
  
          res.status(200).json({
            data: search,
            message: 'search retrieved'
          });
        } catch (err) {
          next(err);
        }
      }
    );
  
    // router.post(
    //   '/', 
    // // passport.authenticate('jwt', {session: false}),
    // // scopesValidationHandler(['create:search']),
    //  validationHandler(createSearchSchema), async function(
    //   req,
    //   res,
    //   next
    // ) {
    //   const { body: search } = req;
    //   try {
    //     console.log(search)
    //     const createdSearchId = await searchService.createSearch( search );
  
    //     res.status(201).json({
    //       data: createdSearchId,
    //       message: 'search created'
    //     });
    //   } catch (err) {
    //     next(err);
    //   }
    // });
  
  //   router.put(
  //     '/:searchId',
  //     // passport.authenticate('jwt', {session: false}),
  //     // scopesValidationHandler(['update:search']),
  //     validationHandler({ searchId: searchIdSchema }, 'params'),
  //     validationHandler(updateSearchSchema),
  //     async function(req, res, next) {
  //       const { searchId } = req.params;
  //       const { body: search } = req;
  
  //       try {
  //         const updatedSearchId = await searchService.updateSearch({
  //           searchId,
  //           search
  //         });
  
  //         res.status(200).json({
  //           data: updatedSearchId,
  //           message: 'search updated'
  //         });
  //       } catch (err) {
  //         next(err);
  //       }
  //     }
  //   );
  
  //   router.delete(
  //     '/:searchId',
  //     // passport.authenticate('jwt', {session: false}),
  //     // scopesValidationHandler(['deleted:search']),
  //     validationHandler({ searchId: searchIdSchema }, 'params'),
  //     async function(req, res, next) {
  //       const { searchId } = req.params;
  
  //       try {
  //         const deletedSearchId = await searchService.deleteSearch({ searchId });
  
  //         res.status(200).json({
  //           data: deletedSearchId,
  //           message: 'search deleted'
  //         });
  //       } catch (err) {
  //         next(err);
  //       }
  //     }
  //   );
   } 

module.exports = SearchApi;