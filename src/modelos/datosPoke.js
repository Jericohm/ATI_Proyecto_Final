var mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');


var gameSchema = new mongoose.Schema({
  
    nombre: String, // FALTA AGREGAR EL ID DEL POKE, NO LO PONGO PARA NO CAUSAR PROBLEMAS
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

  //module.esports = mongoose.model('informacions',gameSchema);
  /*
const solicitaInfo = mongoose.model('informacions',gameSchema);

module.exports = {
  solicitaInfo: solicitaInfo
}*/

//module.exports = mongoose.model('informacions',gameSchema);