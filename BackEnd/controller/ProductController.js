"use strict"
var Product = require("../models/Product");
var fs = require("fs");
var path = require("path");
var productController = {
    saveProduct: (req, res) => {
        let product = new Product();
        var params = req.body;
        product.name = params.name;
        product.price = params.price;
        product.stock = params.stock;
        product.description = params.description;
        product.ignored =false;
        product.creationDate = Date();
        product.updateDate = Date();
        product.image = null;
        product.save((err, productStored) => {
            if (err) {
                return res.status(500).send({ msg: "Error at petition" });
            }
            if (!productStored) {
                return res.status(404).send({ msg: "Product could not be saved" });
            }
            return res.status(200).send({ msg: "Product added successfully", product: productStored });
        });
    },
    getProduct: (req, res) => {
        var product_id = req.params.id;
        Product.findById(product_id, (err, product) => {
            if (err) {
                return res.status(500).send({ msg: "Error during returning the product" });
            }
            if (!product) {
                return res.status(404).send({ msg: "The product dont exist" });
            }
            return res.status(200).send({ product });
        });
    },
    getProducts: (req, res) => {
        Product.find({}).exec((err, products) => {
            if (err) {
                return res.status(500).send({ msg: "Error during getting the products" });
            }
            if (!products) {
                return res.status(404).send({ msg: "There is not products" });
            }
            return res.status(200).send({ products });
        });
    },
    getProductsById: (req, res) => {
        var id = req.params.id;
        Product.find({pyme_id : id}).exec((err, products) => {
            if (err) {
                return res.status(500).send({ msg: "Error during getting the products" });
            }
            if (!products) {
                return res.status(404).send({ msg: "There is no products" });
            }
            return res.status(200).send({ products });
        });
    },
    updateProduct: (req, res) => {
        var product_id = req.params.id;
        var upData = req.body;
        Product.findByIdAndUpdate(product_id, upData, { new: true }, (err, productUpDated) => {
            if (err) {
                return res.status(500).send({ msg: "Error during uptdate" });
            }
            if (!productUpDated) {
                return res.status(404).send({ msg: "Product could no be found" });
            }
            return res.status(200).send({ msg: "Product updated successfully", product: productUpDated });
        });
    },
    deleteProduct: (req, res) => {
        var product_id = req.params.id;
        Product.findByIdAndRemove(product_id, (err, productDeleted) => {
            if (err) {
                return res.status(500).send({ msg: "There has been an error during deleting the product" });
            }
            if (!productDeleted) {
                return res.status(404).send({ msg: "Product could not be found" });
            }
            return res.status(200).send({ msg: "Product deleted successfully", product: productDeleted });
        });
    },
    uploadImagen: (req, res) => {
        var product_id = req.params.id;
        var fileName = "Image_not_upload";
        if (req.files) {
            var filePath = req.files.image.path;
            var fileSplit = filePath.split("\\");
            var fileName = fileSplit[1];
            var extSplit = fileName.split("\.");
            var fileExt = extSplit[1];
            if (fileExt == "png" || fileExt == "jpg" || fileExt == "jpeg" || fileExt == "gif") {
                Product.findByIdAndUpdate(product_id, { imagen: fileName }, { new: true }, (err, productUpdated) => {
                    if (err) {
                        return res.status(500).send({ msg: "The image was not upload" });
                    }
                    if (!productUpdated) {
                        return res.status(404).send({ msg: "The image dont exist" });
                    }
                    return res.status(200).send({ productUpdated });
                });
            }
            else {
                fs.unlink(filePath, (err) => {
                    return res.status(200).send({ msg: "Extension is not valid" });
                });
            }
        }
        else {
            return res.status(500).send({ msg: "files was not upload" });
        }
    },
    getImageFile: (req, res) => {// Metodo para devolver la ruta de la imagen
        var file = req.params.image;
        var path_file = `./img/${file}`;
        fs.exists(path_file, (exists) => {
            if (exists) {
                return res.sendFile(path.resolve(path_file));
            }
            else {
                return res.status(200).send({ msg: "Image dont exist..." });
            }
        });
    },
    getProductByName: (req, res) => {
        let productName = new RegExp(`${req.params.searchBy}`, "i")
        Product.find({ name: productName }).exec((err, products) => {
            if (err) {
                return res.status(500).send({ msg: "There has been an error loading the products" });
            }
            if (!products) {
                return res.status(404).send({ msg: "There is not products" });
            }
            return res.status(200).send({ products });
        });
    }
};

module.exports = productController;