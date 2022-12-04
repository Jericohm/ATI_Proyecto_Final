var mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');


var gameSchema = new mongoose.Schema({
    local:{
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
    }
    
  });

const solicitaInfo = mongoose.model('informacion',gameSchema);

module.exports = {
  solicitaInfo: solicitaInfo
}

//module.exports = mongoose.model('informacion',gameSchema);