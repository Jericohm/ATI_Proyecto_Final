var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GameSchema = Schema({
    id: Number,
    nombre: String,
    anio: String,
    compania: String,
    consola: String
  });

module.exports = mongoose.model('informacion',GameSchema);
