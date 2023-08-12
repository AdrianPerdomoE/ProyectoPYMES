"use strict";
const dotenv = require('dotenv');
dotenv.config();
//cargar el modulo con la configuración de la api
const app = require("./app");
//realizar la conexión con la base de datos en el cloud de mongo
var mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose
  .connect(
    `mongodb+srv://Admin:${process.env.pass}@${process.env.cluster}.mongodb.net/${process.env.database}?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("Conexión con la base de datos establecida con exito..");
    app.listen(parseInt(process.env.port), () => {
      console.log(
        `Servidor corriendo correctamente en la url: localhost:${process.env.port}`
      );
    });
  })
  .catch((err) => {
    console.log("Ha ocurrido un error"), console.log(err);
  });
