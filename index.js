const express = require('express');
const cors = require('cors');

const app = express();

const { config } = require('./config/index');

//const  authApi = require("./routes/auth");
const productApi  = require('./routes/products');
const  SearchApi = require('./routes/search')
// const userMoviesApi = require('./routes/userMovies');

// const {logErrors, wrapErrors, errorHandler} = require('./utils/middleware/errorHandlers')
// const  notFoundHandler  = require('./utils/middleware/notFoundHandler')
app.use(express.json());
app.use(cors());

productApi(app);
SearchApi(app);
// moviesApi(app);
// userMoviesApi(app);


// app.use(logErrors)
// app.use(wrapErrors)
// app.use(errorHandler)



// app.use(notFoundHandler)

app.listen(config.port, function() {
  console.log(`Listening http://localhost:${config.port}`);
});