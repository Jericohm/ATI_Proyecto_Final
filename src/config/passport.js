const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../modelos/datos');
const Poke = require('../modelos/datosPoke');


module.exports = function (passport){
    
    passport.serializeUser(function (user, done){
        done(null, user.id);
    })

    passport.deserializeUser( function (id, done){
        User.findById(id, function(err, user){
            done(err, user);
        });
    });

    //registro de usuario
    passport.use('local-signup', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    function (req, email, password, done) { //Se definen los otros parametros que se recibirán
        User.findOne({'local.email': email}, function(err, user){
            if (err) {return done(err);}
            if (user){
                return done(null, false, req.flash('signupMessage', 'El correo ya está en uso.'));
            }else{
                var newUser = new User();
                newUser.local.email = email;
                newUser.local.password = newUser.generateHash(password);
                newUser.save(function(err){
                    if (err) {throw err;}
                    return done(null, newUser);
                })
            }
        })
    }));

    //inicio de sesión de usuario
    passport.use('local-login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    function (req, email, password, done) {
        User.findOne({'local.email': email}, function(err, user){
            if (err) {return done(err);}
            if (!user){
                return done(null, false, req.flash('loginMessage', 'No se encontró usuario.'));
            }
            if (!user.validatePassword(password)){
                return done(null, false, req.flash('loginMessage', 'Contraseña incorrecta.'));
            }
            return done(null, user);
        })
    }));

    /* BORRAR
    //Validaciones de Información de Pokemon
    passport.serializeUser(function (user, done){
        done(null, poke.id);                        // A LO MEJOR Y REQUIREO CAMBIAR EL NOMBRE user
    })

    passport.deserializeUser( function (id, done){
        Poke.findById(id, function(err, poke){
            done(err, poke);
        });
    });

    //registro de pokemon
    passport.use('local-registro', new LocalStrategy({
        usernameField: 'nombre',
        passReqToCallback: true
    },
    function (req, nombre, ps, atq, atq_esp, def, def_esp, vel/*, tipo, natura, evento, codigo, promo, done) { //Se definen los otros parametros que se recibirán
        Poke.findOne({'local.nombre': nombre}, function(err, poke){
            if (err) {return done(err);}
            if (poke){
                return done(null, false, req.flash('signupMessage', 'Este Pokemon ya existe'));
            }else{
                var newPoke = new Poke();
                newPoke.local.nombre = nombre;
                newPoke.local.ps = ps;
                newPoke.local.atq = atq;
                newPoke.local.atq_esp = atq_esp;
                newPoke.local.def = def;
                newPoke.local.def_esp = def_esp;
                newPoke.local.vel = vel;
                newPoke.save(function(err){
                    if (err) {throw err;}
                    return done(null, newPoke);
                })
            }
        })
    })); FIN TESTING*/

}