const {io} = require('../index');
const Band = require('../models/band');
const Bands = require('../models/bands');

//*creamos nueva instancia de la calse Bands
const bands = new Bands();
bands.addBand(new Band('Queen'));
bands.addBand(new Band('Bon Jovi'));
bands.addBand(new Band('Heroes del Silencio'));
bands.addBand(new Band('Metallica'));

// console.log(bands);

///*Mensajes de Sockets
//*cliente que se acaba de conectar a mi socketServer
io.on('connection', client => {console.log('Cliente conectado')
   //*Podemos mandar un mensaje unciamente al cliente que se esta conectando
    client.emit('active-bands', bands.getBands());  
    client.on('disconnect', () => {console.log('Cliente desconectado')}); //*Notifica cuando el cliente se desconecte
    client.on('mensaje', (payload)=>{ //*el payload es el objeto que recibimos del cliente
        console.log('mensaje!', payload);
        io.emit('mensaje', {admin: 'Nuevo mensaje'}) //*mandamos un objeto todos los clientes
    });
    //*añadir voto a band
    client.on('vote-band', (payload) => {
        bands.voteBand(payload.id);
        //*Notificamos a todos los que estas escuchando que hay un cambio y refrescarlo
        io.emit('active-bands', bands.getBands());
    });

    //*Escuchar add-band
    client.on('add-band', (payload) => {
        const newBand = new Band(payload.bandName);
        bands.addBand(newBand);
        //*Notificamos a todos los que estas escuchando que hay un cambio y refrescarlo
        io.emit('active-bands', bands.getBands());
    });

    client.on('delete-band', (payload) => {
        bands.deleteBand(payload.id);
        //*Notificamos a todos los que estas escuchando que hay un cambio y refrescarlo
        io.emit('active-bands', bands.getBands());
    });

    ///*Referencia pruebas
    // client.on('nuevo-mensaje', (payload) => {
    //     // console.log(payload);
    //     // io.emit('nuevo-mensaje', payload); // *emite a todos los clientes conectados!
    //     client.broadcast.emit('nuevo-mensaje', payload); // *emite a todos menos el que emite
    // })
  });