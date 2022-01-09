const express = require('express'); //es como importacion de un paquete
const path = require('path');
require('dotenv').config(); // Para establecer las variables de entorno
// App de express
const app = express(); //creamos la aplicación de express que es compatible con el servidor mandando el app

// Node Server
const server = require('http').createServer(app); // Creamos el servidor
module.exports.io = require('socket.io')(server); //exportamos el io a todas las carpetas
require('./sockets/socket'); //importamos la carpeta de socket

// Path/carpeta público
const publicPath = path.resolve(__dirname, 'public'); //apunta a donde sea que este montado el servidor en este caso a la carpeta public
app.use(express.static(publicPath));//mostramos el public path en nuestra app

server.listen(process.env.PORT,(err)=>{ //escuchamso en el puerto desseado que retorna un error
    if(err) throw new Error(err); //para que salga el error en consola
    console.log('Servidor corriendo en puerto!!!', process.env.PORT); //mensaje que enseñamos
});

//node index para arrancar el servidor control+C para bajarlo