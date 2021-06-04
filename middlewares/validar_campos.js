const { validationResult } = require("express-validator");
//const { response, request } = require('express');


//ve si cada Check de la ruta esta validado y pasa al siguein y asi hasta que no haya mas validaciones
//si hay algun error lanza un 404
const validarCampo = (req, res, next) => {
  //con eso validamos lo errores con la validacion en la ruta del post
  const errros = validationResult(req);
  if (!errros.isEmpty()) {
    return res.status(400).json(errros);
  }
  //si pasa un middleware va al siguien que esta en la ruta hasta q no hay mas y lanza la ruta
  next();
};

module.exports = {
  validarCampo,
};
