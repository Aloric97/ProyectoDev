
//importing libraries from modules
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser')




const config = require('./config/env')
const connection = require('./config/connection')



async function startServer() {
  // Inicializaciones
  const app = express();

  //middlewares
  app.use(cookieParser())
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(cors())

 //Routes
  app.use('', require('./routes/index'));
  app.use('', require('./middlewares/resetPassword'));


  // Connect to database
  try {
    await connection.sync().then(() => {
      console.log('Connection to database successful');
      app.listen(config.SERVER_PORT, () => console.log(`Now listening port: ${config.SERVER_PORT}`));
    });

  } catch (error) {
    console.log(error)
  }



}

startServer();

module.exports = startServer