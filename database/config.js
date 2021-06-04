const mongoose = require('mongoose');

const dbConnection = async () => {
  try {
    //conecxion a la db con mongoose
    await mongoose.connect(process.env.MONGODB_CONET, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log('conexion exitosa');
  } catch (error) {
    console.log(error);
    throw new Error('Error al conectar la db');
  }
};

module.exports = {
  dbConnection,
};
