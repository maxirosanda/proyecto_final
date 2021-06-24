const Mensaje = require('../models/mensajes');


  exports.createMensajes = async (req, res, next) => {  
      try{
        mensaje = new Mensaje(req.body)
        await mensaje.save()
        await res.redirect("/producto/" + mensaje.articulo ) 
      }
    catch (e) { console.log(e) }
  }
