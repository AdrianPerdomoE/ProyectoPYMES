"use strict"
// configuración de las rutas

var express = require("express");
var productController = require('../controller/ProductController')
var router = express.Router();
var multipart = require("connect-multiparty");
var multipartMiddleWare = multipart({ uploadDir: "./archivos" });

//rutas para cliente

//rutas para producto
router.post("/SaveProduct", productController.saveProduct);
router.get("/GetProduct/:id", productController.getProduct);
router.get("/GetProducts", productController.getProducts);
router.put("/UpdateProduct/:id", productController.updateProduct);
router.delete("/DeleteProduct/:id", productController.deleteProduct);
router.post("/UploadImagen/:id", multipartMiddleWare, productController.uploadImagen);
router.get("/GetImagen/:image", productController.getImageFile);
router.get("/getProductByName/:searchBy", productController.getProductByName);
router.get("/getProductsById/:id", productController.getProductsById);



// Se exporta el modulo para importarlo en app

module.exports = router;