var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GameSchema = Schema({
    id: Number,
    nombre: String,
    ps: Number,
    atq: Number,
    atq_esp: Number, 
    def: Number,
    def_esp: Number,
    vel: Number,
    tipo: String,
    naturaleza: String,
    evento: Number,
    codigo: Number,
    promocion: Number
  });

module.exports = mongoose.model('informacion',GameSchema);

/*
var GameSchema = Schema({
  id: Number,
  nombre: String,
  anio: String,
  compania: String,
  consola: String
});
*/