var mongoose = require('mongoose');
var express = require('express');
// const Pokemon = require('../modelos/datosPoke');

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
  promo: String

});

const Pokemon = mongoose.model('informacions',gameSchema);

module.exports = (app, passport) => {

  app.get('/', function(req, res, next) {
    res.render('menu',{style:'headers.css', img:'logoPKB.png'});
  });

  //Manejo de inicio de sesión
  app.get('/inicioSesion', function(req, res) {
    res.render('inicia_sesion.ejs', {
      message: req.flash('loginMessage')
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
      message: req.flash('signupMessage')
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

  //Función de validación de usuario activo
  function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
      return next();
    }
    return res.redirect('/');
  };

  app.get('/RegistrarPoke', function(req, res) {
    res.render('RegistrarPoke');
  });

  /*
  app.post('/RegistrarPoke', passport.authenticate('local-registro',{
    successRedirect: '/vistaPokemon',
    failureRedirect: '/RegistrarPoke',
    failureFlash: true,
  }));*/


  /*Metodo Post (Está bien)*/ 
  app.post('/RegistrarPoke', async (req, res, next)=>{
    
    console.log(req.body)
    
    //let informacions = new Pokemon()
      var dato = Pokemon({
        id: req.body.id,
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
        promo: req.body.promo
      })
  
      dato.save((err,data)=>{
        if(err){
          res.json({'error':"Error al insertar"});
        }else{
          res.status(200).json(data);
        }
      })
      //res.redirect('/RegistrarPoke')
    
    
      //res.redirect('/menu') // vistaPokemon
});

  

  //Linea de código para validar output de FORM (NO BORRAR)
  /*
  app.post('/RegistrarPoke', (req, res) => {
    // FUSIONAR LAS 2
    console.log(req.body);
  });*/
                                      //Existe un problema al implementar el save
  

  app.get('/vistaPokemon', function(req, res) {
    res.render('viewPokemon');
  });





  app.get('/tablasPokemon', (req, res) => {
    Pokemon.find({}, function(err, poke) {
      if(err){
        console.log(err);
      }else{
        res.render('testing', {
          listaPoke: poke
        })
      }})
  })

  app.get('/Home-Tabla', (req, res) => {
    Pokemon.find({}, function(err, poke) {
      if(err){
        console.log(err);
      }else{
        res.render('testing', {
          listaPoke: poke
        })
      }})
  })

  /*
  app.get('/tablasPokemon', function(req, res) {
    res.render('testing');
  });*/


};
