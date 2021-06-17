const Producto = require('../models/productos');
var mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);



exports.agregar = async (req, res, next) => {

 try{
  producto = await Producto.find({}).lean()
  await res.render("agregarProducto", {productos: producto})
}
catch (e) { console.log(e) } 
}

 exports.getProductos = async (req, res, next) => {
  try{
     producto = await Producto.find({}).lean()
     await res.render("productos", {productos: producto}) 
  }
  catch (e) { console.log(e) } 
  }


 exports.getProducto = async (req, res, next) => {
    let id = req.params.id;
    try{
       producto = await Producto.find({_id: id}).lean()
       console.log(producto[0])
       await res.render(`producto`, {producto: producto}) 
    }
    catch (e) { console.log(e) } 
    }


  exports.createProductos = async (req, res, next) => {  
    console.log(req.body)
    try{
      producto = new Producto(req.body)
      await producto.save()
      await res.redirect("/agregar")   
    }
  catch (e) { console.log(e) }
}
exports.updateProducto = async (req, res, next) => { 
  
  let id = req.params.id;
  const {nombre,codigo,descripcion,url,precio,stock}=req.body
  let nuevoproducto={}
  
  if(nombre) nuevoproducto.nombre=nombre
  if(codigo) nuevoproducto.codigo=codigo
  if(descripcion) nuevoproducto.descripcion=descripcion
  if(url) nuevoproducto.url=url
  if(precio) nuevoproducto.precio=precio
  if(stock) nuevoproducto.stock= stock

  try{
    let producto = await Producto.findOneAndUpdate(
    {_id: id},
    {$set:nuevoproducto},
    {new:true}
    )
    await res.redirect("/agregar")   
  }
  catch (e) { console.log(e) }

  },

  exports.deleteProductos = async (req, res, next) => {
    let id = req.params.id;
    try{
      producto = await  Producto.deleteOne({_id: id})
      await res.redirect("/agregar") 
    }
     catch (e) { console.log(e) } 

}
