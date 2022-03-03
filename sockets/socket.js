const {io} = require('../index');

// Mensajes de Sockets
io.on('connection', client => {console.log('Cliente conectado')  //cliente que se acaba de conectar a mi socketServer
    client.on('disconnect', () => {console.log('Cliente desconectado')}); //Notifica cuando el cliente se desconecte
    client.on('mensaje', (payload)=>{ //el payload es el objeto que recibimos del cliente
        console.log('mensaje!!!', payload);
        io.emit('mensaje', {admin: 'Nuevo mensaje'}) //mandamos un objeto todos los clientes
    });

    client.on('nuevo-mensaje', (payload) => {
        io.emit('nuevo-mensaje', payload); // *emite a todos los clientes conectados!
        /* client.broadcast.emit('nuevo-mensaje', payload); */ // *emite a todos menos el que emite
    })
  });