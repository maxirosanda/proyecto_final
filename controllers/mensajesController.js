const Mensaje = require('../models/mensajes');


  exports.getMensajes = async (req, res, next) => {
    try{
       mensaje = await Mensaje.find({})
      await res.status(200).json(mensaje)  
    }
    catch (e) { console.log(err) } 
    }

  exports.createMensajes = async (req, res, next) => {  
      console.log(req.body)
      try{
        mensaje = new Mensaje(req.body)
        await mensaje.save()
        await res.status(200).json(mensaje)  
      }
    catch (e) { console.log(e) }
  }
