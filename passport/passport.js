var mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
const User = require('../models/usuarios');
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const FacebookStrategy = require('passport-facebook').Strategy
const bcrypt = require('bcrypt');
const config = require("../config/configFacebook");

const isValidPassword = function(user,password){
  return bcrypt.compareSync(password,user.password)
}
const createHash = function(password){
  return bcrypt.hashSync(password,bcrypt.genSaltSync(10),null)
}

passport.use('login', new LocalStrategy({
    passReqToCallback : true
  },
  function(req, username, password, done) { 
    User.findOne({'username':username},
    function(err,user){
      if(err) return done(err)
      if(!user) return done (null,false)
      if(!isValidPassword(user,password)) return done(null,false)
      return done(null,user)
    })
    
  })
);

passport.use('register', new LocalStrategy({
    passReqToCallback : true
  },
  function(req, username, password, done) {
    findOrCreateUser = function(){
        
      User.findOne({'username':username},
      function(err,user){
        if(err) return done(err)
        if(user) {
          return done (null,false)
        }else{
          var newUser= new User()
          newUser.username=username
          newUser.password=createHash(password)
          newUser.save(function(err){
            if(err){ throw err}
            return done(null,newUser)
          })
          
        }
      })
      
    }
    process.nextTick(findOrCreateUser);
  })
)
 
passport.use('facebook', new FacebookStrategy({
  clientID: config.facebook.clientID,
  clientSecret: config.facebook.clientSecret,
  callbackURL: "/facebook/callback"
}, (accessToken, refreshToken, profile, done) => {
  let userFace = {}
  userFace.username = profile.displayName;
  userFace.password = profile.id;
  findOrCreateUser = function(){
        
    User.findOne({'username': userFace.username},
    function(err,user){
      if(err) return done(err)
      if(user) {
        return done (null,user)
      }else{
        var newUser= new User()
        newUser.username=userFace.username
        newUser.password=createHash(userFace.password)
        newUser.save(function(err){
          if(err){ throw err}
          return done(null,newUser)
        })
        
      }
    })
    
  }
  process.nextTick(findOrCreateUser);
  
}))
 

passport.serializeUser(function(user, done) {
    done(null, user._id);
});
   
passport.deserializeUser(function(id, done) {
    User.findById(id,function (err,user){
      done(null, user)
    })
      
});


