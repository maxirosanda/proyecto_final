
module.exports = {
    
    vistalogin: (req,res)=>{
        res.render("login")
    },
    vistaregistro: (req,res)=>{
        res.render("registro")
    },

    login: (req, res) => {
        res.redirect("/agregar");
    },

    register: (req, res) => {
        res.redirect("/agregar");
    },

    logout: (req, res) => {
        req.session.destroy( err => {
            if(err) return err;

            res.redirect("/login");
        })
    }
}