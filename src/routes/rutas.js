var mongoose = require('mongoose');
var express = require('express');
const router = express.Router();
const {usuarios} = require('../modelos/datos');

//app.get('//:id', users.deleteUser);

var gameSchema = new mongoose.Schema({

  id:String,
  nombre: String, // FALTA AGREGAR EL ID DEL POKE, NO LO PONGO PARA NO CAUSAR PROBLEMAS
  ps: Number,
  atq: Number,
  atq_esp: Number,
  def: Number,
  def_esp: Number,
  vel: Number,
  tipo: String,
  natura: String,
  evento: String,
  codigo: String,
  promo: String,
  idp : String,
  tipo2 : String

});

const Pokemon = mongoose.model('informacions',gameSchema);

module.exports = (app, passport) => {

  app.get('/', function(req, res, next) { //Rutas Listas (Falta mejor vista)
    res.render('menu',{
      style:'headers.css',
      img:'logoPKB.png',
      user: req.user
    });
  });  

  //Manejo de inicio de sesión
  app.get('/inicioSesion', function(req, res) {
    res.render('inicia_sesion.ejs', {
      message: req.flash('loginMessage'),
      user: req.user
    });
  });

  app.post('/inicioSesion', passport.authenticate('local-login',{
    successRedirect: '/profile',
    failureRedirect: '/inicioSesion',
    failureFlash: true,
  }));

  //Manejo de Registro de nuevo usuario
  app.get('/registro', function(req, res) {
    res.render('Registro', {
      message: req.flash('signupMessage'),
      user: req.user
    });
  });

  //Registro de usuarios nuevos
  app.post('/registro', passport.authenticate('local-signup',{
    successRedirect: '/profile',
    failureRedirect: '/registro',
    failureFlash: true,
  }));

  //Vista del usuario logeado
  app.get('/profile', isLoggedIn, (req, res) => {
    res.render('profile', {
      user: req.user
    });
  });

  //Manejo de cerrado de sesión
  app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  //Manejo de Recuperación de contraseña (Aún no funciona)
  app.get('/recupera', function(req, res) {
    res.render('RecuperarContra');
  });


  app.get('/eliminar', isLoggedIn, function(req, res) { //Necesita una validación
    res.render('EliminarPoke', {
      user: req.user
    });
  });

  app.get('/tablaAdmin', (req, res) => {
    Pokemon.find({}, function(err, poke) {
      if(err){
        console.log(err);
      }else{
        res.render('testingAdmin', {
          listaPoke: poke,
          user: req.user
        })
      }})
  });

  app.get('/PerfilPokemon', function(req, res) {
    res.render('PerfilPoke');
  });

  //Función de validación de usuario activo
  function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
      return next();
    }
    return res.redirect('/');
  };

  app.get('/RegistrarPoke', isLoggedIn, function(req, res) { //Necesita una validación
    res.render('RegistrarPoke', {
      user: req.user
    });
  });

  app.get('/editarPoke', isLoggedIn, function(req, res) { //Necesita una validación
    res.render('EditarPoke', {
      user: req.user
    });
  });

  /*
  app.post('/RegistrarPoke', passport.authenticate('local-registro',{
    successRedirect: '/vistaPokemon',
    failureRedirect: '/RegistrarPoke',
    failureFlash: true,
  }));*/


  /*Metodo Post*/
  app.post('/RegistrarPoke', async (req, res, next)=>{

    console.log(req.body)

    //let informacions = new Pokemon()
      var dato = Pokemon({
        idp: req.body.id,
        nombre: req.body.nombre,
        ps: req.body.ps,
        atq: req.body.atq,
        atq_esp: req.body.atq_esp,
        def: req.body.def,
        def_esp: req.body.def_esp,
        vel: req.body.vel,
        tipo: req.body.tipo,
        evento: req.body.evento,
        codigo: req.body.codigo,
        promo: req.body.promo,
        natura: req.body.natura
      })

      dato.save((err,data)=>{
        if(err){
          res.json({'error':"Error al insertar"});
        }else{
          res.status(200).json(data);
        }
      })
});

// Borrar, no está implementado
app.post('/delete/:_id', function(req, res, next) {
  Pokemon.findOneAndRemove({'_id':req.params._id}, (err)=>{ //deleteOne
    if(err){
      res.json({'Error':'No existe'});
    }else{
      res.json({'Estatus':'Borrado'});
    }
  });
  //res.render('permisosAdmin');
});

exports.deletePoke = function(req, res) {

  Pokemon.findOneAndRemove({
      _id: req.params._id
  }, function(err, user) {

      if (err) throw err;

      console.log("Success");

  });

  res.redirect('/');

};

// Rutas para actualizar permisos
app.get('/admin', isLoggedIn ,function(req, res, next) { //Rutas Listas (Falta mejor vista)
  res.render('permisosAdmin',{
    style:'headers.css',
    img:'logoPKB.png',
    user: req.user
  });
});

app.post('/admin', passport.authenticate('local-admin',{
  successRedirect: '/',
  failureRedirect: '/admin',
  failureFlash: true,
}));

  app.get('/vistaPokemon', function(req, res) {
    res.render('viewPokemon');
  });

  app.get('/tablasPokemon', (req, res) => {
    Pokemon.find({}, function(err, poke) {
      if(err){
        console.log(err);
      }else{
        res.render('testing', {
          listaPoke: poke,
          user: req.user
        })
      }})
  });



  app.get('/Home-Tabla', (req, res) => {
    Pokemon.find({}, function(err, poke) {
      if(err){
        console.log(err);
      }else{
        res.render('testing', {
          listaPoke: poke,
          user: req.user
        })
      }})
  })

  /*
  app.get('/tablasPokemon', function(req, res) {
    res.render('testing');
  });*/


};
