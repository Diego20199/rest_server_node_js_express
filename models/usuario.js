const { Schema, model } = require('mongoose');

const UsuarioShema = new Schema({

  nombre: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
  },
  correo: {
    type: String,
    required: [true, 'obligacion'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'obligacion'],
    unique: true,
  },
  img: {
    type: String,
  },
  rol: {
    type: String,
    required: true,
    emun: ['ADMIN_ROLE', 'USER_ROLE'],
  },
  estado: {
    type: Boolean,
    default: true,
  },
  google: {
    type: Boolean,
    default: false,
  },
});

//metodo para sobre escribir metodos
//estamos sobreecribiendo el metodo toJSON
UsuarioShema.methods.toJSON = function () {
  const { __v, password, ...datos_user } = this.toObject();
  return datos_user;
};

module.exports = model('Usuario', UsuarioShema);
