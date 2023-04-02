'use strict'
var mongoose = require('mongoose');
const { Kart } = require('./Kart');

var Schema = mongoose.Schema;

var Client = Schema({ 
    name: String,
    password: String,
    shoppingKart: mongoose.Types.Subdocument
});

module.exports = mongoose.model("Client", Client);