'use strict'

var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var Pyme = Schema({ 
    name: String,
    category: String,
    password: String,
    pageStyle: mongoose.Types.Subdocument,
    creationDate: Date
});

module.exports = mongoose.model("Pyme", Pyme);