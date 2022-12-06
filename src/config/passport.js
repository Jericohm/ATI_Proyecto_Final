const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../modelos/datos');

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
                newUser.local.nombre = req.body.nombre;
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

}