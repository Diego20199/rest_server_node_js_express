const { response, request } = require('express');

const userGet = (req = request, res = response) => {
  //con esto extraermos todo lo datos adiciones de la url que venga con ?
  const {q, nombre='no name', apikey, page=1, limit} = req.query;
  res.json({
    //indica que se creo algo
    msg: 'Get API - controlador',
    q,
    nombre,
    apikey,
    page,
    limit
  });
};

//controlador de rutas

const userPut = (req, res = response) => {
  const id = req.params.id;

  res.json({
    //indica que se creo algo
    msg: 'Put API - controlador',
    id,
  });
};
const userPost = (req, res = response) => {
  //lo que sea que venga en body lo va reflajar
  const { nombre, edad } = req.body;
  res.json({
    //indica que se creo algo
    msg: 'Post API - controlador',
    nombre,
    edad,
  });
};
const userDelete = (req, res = response) => {
  res.json({
    //indica que se creo algo
    msg: 'Delete API - controlador',
  });
};
const userPatch = (req, res = response) => {
  res.json({
    //indica que se creo algo
    msg: 'Patch API - controlador',
  });
};

module.exports = {
  userGet,
  userPut,
  userPost,
  userDelete,
  userPatch,
};
