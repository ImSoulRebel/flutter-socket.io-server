
const {v4: uuidV4} = require('uuid');

class Band{
    //*recibe nombre por defecti
    constructor(name = 'no-name'){
        //*definimos propiedades
        this.id = uuidV4(); //*Identificador único
        this.name = name;
        this.votes = 0;
    }
}

module.exports = Band;