const ProductosController = require('../controllers/productosController');
const CarritoController = require('../controllers/carritoController');
const MensajesController = require('../controllers/mensajesController');
const middlewareAdmin = require('../middlewares/middlewareAdmin')
const sessionController = require('../controllers/sessionController')
const passport = require("passport");  

module.exports = app => {
  
  
  app.get("/login",sessionController.vistalogin)
  app.get("/registro",sessionController.vistaregistro)
  app.get("/logout", sessionController.logout);
  app.get("/failLogin", (req, res) => { res.send("falla al logear")});
  app.get("/failRegister", (req, res) => { res.send("falla al registrar")});
  app.post("/login", passport.authenticate('login', {failureRedirect: 'failLogin'}), sessionController.login);
  app.post("/register", passport.authenticate('register', {failureRedirect: 'failRegister'}), sessionController.register);

  app.get("/facebook", passport.authenticate("facebook"));
  app.get("/facebook/callback", passport.authenticate('facebook', {successRedirect: '/agregar', failureRedirect: '/login'}));


  app.get("/agregar",middlewareAdmin.auth,ProductosController.agregar)
  app.get('/',ProductosController.getProductos);
  app.get('/producto/:id',ProductosController.getProducto);
  app.post('/productos', ProductosController.createProductos);
  app.put('/productos/:id', ProductosController.updateProducto);
  app.delete('/productos/:id', ProductosController.deleteProductos);

  app.get('/carrito', CarritoController.getCarritos);
  app.get('/prodcard/:id', CarritoController.getProdcard);
  app.post('/carrito', CarritoController.createCarrito);
  app.put('/carrito/:id',CarritoController.updateCarrito);
  app.delete('/carrito/:id', CarritoController.deleteCarrito);

  app.post('/mensajes', MensajesController.createMensajes);
};