const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const mongoose=require('mongoose');

const Usuario = require('../models/usuario');

const userGet = async (req = request, res = response) => {
  //con esto extraermos todo lo datos adiciones de la url que venga con ?
  const { limite = 5, desde=0 } = req.query;//estos dato los saca de la url y son opcionales
  //al query sacamos los que vengan con estado true
  const query= {estado:true};
  // const usuariosGet = await Usuario.find(query).skip(Number(desde)).limit(Number(limite));
  // const total= await Usuario.countDocuments(query);//ver total de registros
  // es un colecion de promesar, es xq con los await se tarda mucho en reponder ya que esto no depende del otro
  //sino que el primero espera y luego de que responda recien el segundo va a contar los registros
  //el all([]) ejecuta ambas funciones al mismo tiempo y no va conitnuar hasta que ambas se allan ejecutado
  //y si una da error todas lo daran
  //total: resultado de la primera promesa de forma auto se asgina
  //usuarios: resultado de la segunda promesa de forma auto se asgina
  const [total, usuarios] = await Promise.all([
    Usuario.countDocuments(query),//ver total de registros
    //find() si notiene nada dentro trae todos los datos
    Usuario.find(query).skip(Number(desde)).limit(Number(limite))
  ]);
  res.json({
    //indica que se creo algo
    msg: 'Get API - controlador',
    total,
    usuarios
    
  });
};

const userPost = async (req, res = response) => {
  //lo que sea que venga en body lo va reflajar
  const { nombre, correo, password, rol } = req.body;
  const usuario = new Usuario({ nombre, correo, password, rol });

  //encrytar contraseña
  const salt = bcryptjs.genSaltSync();
  usuario.password = bcryptjs.hashSync(password, salt);

  //guarda la info en la DB
  await usuario.save();

  //muestra los datos en posmat(regresa al user)
  res.json({
    //indica que se creo algo
    msg: 'Post API - controlador',
    usuario,
  });
};

//controlador de rutas
//actualizar
const userPut = async (req, res = response) => {
  const { id } = req.params;
  //aca extrae lo argumentos y los extra
  //_id para proteger el id de modificaciones en el body
  const { _id, password, google, correo, ...datos_user } = req.body; //datos_user son el restro de atributos
  //validar base de datos
  if (password) {
    //encrytar contraseña
    const salt = bcryptjs.genSaltSync();
    datos_user.password = bcryptjs.hashSync(password, salt);
  }
  //findByIdAndUpdate busca el id y actualiza todos los datos
  const usuario = await Usuario.findByIdAndUpdate(id, datos_user);

  res.json({
    //indica que se creo algo
    msg: 'Put API - controlador',
    usuario,
  });
};



const userDelete = async(req, res)=>{
  const {id}= req.params;
  
  const usuario = await Usuario.findByIdAndUpdate(id,{estado:false});
  res.json(usuario);

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
