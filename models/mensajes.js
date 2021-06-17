
var mongoose = require('mongoose');

const mensajesCollection='mensajes'
const mensajesSchema = new mongoose.Schema({

    mail:{type:String,require:true},
    mensaje:{type:String,require:true},
    fecha:{type:String,require:true},

})

module.exports = mongoose.model(mensajesCollection,mensajesSchema)