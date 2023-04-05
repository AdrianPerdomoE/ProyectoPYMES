'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = Schema({ 
    name: String,
    password: String,
    shoppingKart: Object
});

module.exports = mongoose.model("User",User);