const {Schema, model}= require('mongoose');

const RoleSchema= new Schema({
    rol: {
        type:String,
        required:[true,'Obligacion']
    }
});

module.exports= model('Role',RoleSchema);//se le asfina un nombre 