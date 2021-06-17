exports.auth =(req,res,next)=>{
    if(req.isAuthenticated()) {
        if(req.session.contador) {
            req.session.contador++;
        } else {
            req.session.contador = 1;
        }
    res.send("los datos se pueden ver")
    } else {
        res.send("no se pueden mostrar los datos");
    }
}