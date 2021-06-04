//para usar los routers de express
const { Router } = require('express');
const { check } = require('express-validator');
const mongoose = require('mongoose');
//var para usar sus cualidades de router de node js
const router = Router();
const {
  esRolValido,
  emailExiste,
  userExistePorID,
} = require('../helpers/db_validators');
//validados de campos
const { validarCampo } = require('../middlewares/validar_campos');

//controladores
const {
  userGet,
  userPut,
  userPost,
  userDelete,
  userPatch,
} = require('../controllers/user_controllers');
const Usuario = require('../models/usuario');

//GET
router.get('/', userGet);

//PUT
router.put(
  '/:id',
  [
    //para validadr que se sea un id de mongoDB
    check('id', 'NO es un ID valido').isMongoId(), //de express validator
    check('id').custom(userExistePorID),
    check('rol').custom(esRolValido),
    validarCampo,
  ],
  userPut
); //es la referencia de la funcion

//POST
router.post(
  '/',
  [
    //validamos el formato del correo
    check('nombre', 'El nombre es obligacion').not().isEmpty(),
    check(
      'password',
      'La contraseña es obliglatoria y min 6 caracteres'
    ).isLength({ min: 6 }),
    //check('correo','El correo no es del formato correspondiente').isEmail(),
    //check('rol','NO es un rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    //custom evalua el valor que recibe 'rol'
    check('correo').custom(emailExiste),
    check('rol').custom(esRolValido), //(rol)=>esRolValido(rol) como es el mismo campo
    //se abrevrebia asi ya que es mismo parametro que recibe
    validarCampo,
  ],
  userPost
);

//DELETE
//recibe el id como segmento(:id)
router.delete('/:id',[
  check('id', 'NO es un ID valido').isMongoId(), //de express validator
  validarCampo,
  check('id').custom(userExistePorID),

], userDelete);
// router.delete(
//   '/:id',
//   check('id', 'NO es un ID valido').isMongoId(), //de express validator
//   check('id').custom(userExistePorID),
//   async (req, res) => {
//     const id = req.params.id;
//     if (!mongoose.isValidObjectId(id)) {
//       console.log('error');
//       return;
//     }
//     const usuario = await Usuario.findByIdAndUpdate(req.params.id, {
//       estado: false,
//     });
//     res.json(usuario);
//   },
//   validarCampo
// );


//PACHT
router.patch('/', userPatch);

module.exports = router;
