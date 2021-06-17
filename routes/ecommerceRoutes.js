const ProductosController = require('../controllers/productosController');
const CarritoController = require('../controllers/carritoController');
const MensajesController = require('../controllers/mensajesController');
const middlewareAdmin = require('../middlewares/middlewareAdmin')
const sessionController = require('../controllers/sessionController')
const passport = require("passport");  

module.exports = app => {
  
  app.get("/agregar",ProductosController.agregar)

  app.get("/failLogin", (req, res) => { res.send("falla al logear")});
  app.post("/login", passport.authenticate('login', {failureRedirect: 'failLogin'}), sessionController.login);
  app.get("/failRegister", (req, res) => { res.send("falla al registrar")});
  app.post("/register", passport.authenticate('register', {failureRedirect: 'failRegister'}), sessionController.register);
  app.get("/logout", sessionController.logout);
  app.get("/facebook", passport.authenticate("facebook"));
  app.get("/facebook/callback", passport.authenticate('facebook', {successRedirect: 'http://localhost:3000', failureRedirect: 'http://localhost:3000/error'}));

  app.get('/contenido',middlewareAdmin.auth,(req,res) =>{
    res.send("contenido para ver")
})

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

  app.get('/mensajes', MensajesController.getMensajes);
  app.post('/mensajes', MensajesController.createMensajes);
};