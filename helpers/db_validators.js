const { response, request } = require('express');
const Role = require('../models/rol');
const Usuario = require('../models/usuario');

const esRolValido = async (rol = '') => {
  const exiteRol = await Role.findOne({ rol }); //findOne busca uno que se igual
  //si no existe el rol en la DB
  if (!exiteRol) {
    throw new Error(`El rol ${rol} no esta en la DB`);
  }
};

const emailExiste = async (correo = '') => {
  //verificar si el correo existe
  const mailValidate = await Usuario.findOne({ correo }); //busca si uno como lo dice y si es igual a correo
  if (mailValidate) {
    throw new Error(`El ${correo} ya esta ingresado a la BD`);
  }
};

const userExistePorID = async (id) => {
  //verificar si el correo existe
  const userValidate = await Usuario.findById({ id }); //busca si uno como lo dice y si es igual a correo
  if (!userValidate) {
    throw new Error(`El ${id} no existe en ls DB`);
  }
};

module.exports = {
  esRolValido,
  emailExiste,
  userExistePorID,
};
