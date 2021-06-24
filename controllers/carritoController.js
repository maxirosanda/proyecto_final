const Carrito = require('../models/carrito');

exports.getCarritos = async (req, res, next) => {
  try{
     carrito = await Carrito.find({}).lean() 
    await res.render("carrito", {carrito: carrito}) 
  }
  catch (e) { console.log(e) } 
  }

  exports.getProdcard = async (req, res, next) => {
    let id = req.params.id;
    try{
      prodcard = await Carrito.find({_id: id}).lean()
       await res.render(`prodcard`, {prodcard: prodcard}) 
    }
    catch (e) { console.log(e) } 
    }

  exports.createCarrito = async (req, res, next) => {  
    try{
      let encontrado = await Carrito.find({codigo:req.body.codigo}).lean() 
      if(Object.entries(encontrado).length === 0)
        {
        console.log("no encontrado")
      carrito = new Carrito(req.body)
      await carrito.save()
      await res.redirect("/carrito")
      }else
      {
        console.log(encontrado[0].cant_compra)
        console.log(req.body.cant_compra)
        let nuevoproducto={}
        nuevoproducto.cant_compra= encontrado[0].cant_compra + parseInt(req.body.cant_compra); 
  let carrito = await Carrito.findOneAndUpdate(
      {_id: encontrado[0]._id},
      {$set:nuevoproducto},
      {new:true}
      )
      await res.redirect("/carrito")
      }

    }
  catch (e) { console.log(e) }
}
exports.updateCarrito = async (req, res, next) => { 
    let id = req.params.id;
    const {nombre,codigo,descripcion,url,precio,cant_compra}=req.body
    let nuevoproducto={}
    
    if(nombre) nuevoproducto.nombre=nombre
    if(codigo) nuevoproducto.codigo=codigo
    if(descripcion) nuevoproducto.descripcion=descripcion
    if(url) nuevoproducto.url=url
    if(precio) nuevoproducto.precio=precio
    if(cant_compra) nuevoproducto.cant_compra= cant_compra
  
    try{
      let carrito = await Carrito.findOneAndUpdate(
      {_id: id},
      {$set:nuevoproducto},
      {new:true}
      )
      await res.status(200).json(carrito)  
    }
    catch (e) { console.log(e) }
  
    },

  exports.deleteCarrito = async (req, res, next) => {
    let id = req.params.id;
    try{
      carrito = await  Carrito.deleteOne({_id: id})
      await res.redirect("/carrito")  
    }
     catch (e) { console.log(e) } 

}