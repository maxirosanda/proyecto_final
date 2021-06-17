   

    exports.sessionLogout= (req, res, next) => {

      req.session.destroy(err =>{
          if(!err) res.send('logout ok')
          else res.send({status:'Logout ERROR',body:err})
      })


      
    },

    exports.login= (req, res, next) => {

       if(!req.query.usuario){
           res.send('usuario rechazado')
       }else if(req.query.usuario==="maxi"){
            req.session.usuario="maxi"
            req.session.admin=true
            res.send('login correcto')

       }
        
      }


