//para usar los routers de express
const { Router } = require('express');
//controladores
const {
  userGet,
  userPut,
  userPost,
  userDelete,
  userPatch,
} = require('../controllers/user_controllers');
//var para usar sus cualidades
const router = Router();

//GET
router.get('/', userGet);

//PUT
router.put('/:id', userPut); //es la referencia de la funcion

//POST
router.post('/', userPost);

//DELETE

router.delete('/', userDelete);
//PACHT
router.patch('/', userPatch);

module.exports = router;
