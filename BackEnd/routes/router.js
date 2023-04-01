"use strict"
// configuración de las rutas

var express = require("express");

var router = express.Router();
var multipart = require("connect-multiparty");
var multipartMiddleWare = multipart({ uploadDir: "./archivos" });

//rutas para 


// Se exporta el modulo para importarlo en app

module.exports = router;