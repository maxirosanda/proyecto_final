
module.exports = {
    
    login: (req, res) => {
        res.redirect("/contenido");
    },

    register: (req, res) => {
        res.redirect("/contenido");
    },

    logout: (req, res) => {
        req.session.destroy( err => {
            if(err) return err;

            res.send("se deslogio");
        })
    }
}