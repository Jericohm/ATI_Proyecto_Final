var mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

var Schema = mongoose.Schema;

//const solicitaInfo = mongoose.model('informacion',GameSchema);

const usuarioSchema = new mongoose.Schema({
  local:{
    nombre: String,
    password: String,
    email: String
  }
});

//const solicitaUsuario = mongoose.model('usuario',usuarioSchema); // Podría dar problemas

usuarioSchema.methods.generateHash = function (password){
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

usuarioSchema.methods.validatePassword = function (password){
  return bcrypt.compareSync(password, this.local.password);
};

/*
module.exports = {
  solicitaInfo: solicitaInfo,
  solicitaUsuario: solicitaUsuario
}*/

module.exports = mongoose.model('usuarios',usuarioSchema);
