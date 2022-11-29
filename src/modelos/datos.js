var mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

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

const usuarioSchema = new mongoose.Schema({
  local:{
    id: Number,
    nombre: String,
    password: String,
    correo: String,
    admin: Number
  } 
});

const solicitaUsuario = mongoose.model('usuario',usuarioSchema); // Podría dar problemas

usuarioSchema.methods.generateHash = function (password){
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

usuarioSchema.methods.validatePassword = function (password){
  return bcrypt.compareSync(password, this.local.password);
};

module.exports = {
  solicitaInfo: solicitaInfo,
  solicitaUsuario: solicitaUsuario
}

//module.exports = mongoose.model('informacion',GameSchema);

