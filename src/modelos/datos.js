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
    natura: String,
    evento: Number,
    codigo: Number,
    promo: Number
  });

const solicitaInfo = mongoose.model('informacion',GameSchema);

var usuarioSchema = Schema({
  id: Number,
  nombre: String,
  password: String,
  correo: String
});

const solicitaUsuario = mongoose.model('usuario',usuarioSchema);

module.exports = {
  solicitaInfo: solicitaInfo,
  solicitaUsuario: solicitaUsuario
}

//module.exports = mongoose.model('informacion',GameSchema);

