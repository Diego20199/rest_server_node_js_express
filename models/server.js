const express = require('express');
const cors = require('cors');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    //esto es el path y cada metodo se activara cuando se solitite y vea de que tipo es(put get, etc)
    this.userRoutesPath = '/api/usuarios';

    //Midleewares // es un funcion que siempre se ejecuta al levantar nuestro server
    this.middlewares();
    //rutas
    this.routes();
  }

  middlewares() {
    //CORS
    this.app.use(cors());

    //lectura y parseo del middlerware
    //serializa la informacion en fomato json
    this.app.use(express.json());

    //directorio public
    // por defecto buscar el index.html
    this.app.use(express.static('public')); //this.app.get('/', (req, res) es lo mismo
  }

  routes() {
    this.app.use(this.userRoutesPath, require('../routes/user_routes'));
  }

  lisen() {
    this.app.listen(this.port, () => {
      console.log('Servicor corriendo en el puerto: ', this.port);
    });
  }
}

module.exports = Server;
