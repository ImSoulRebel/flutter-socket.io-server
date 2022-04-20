///*Maneamos coleccion de bandas

const Band = require("./band");

class Bands{
    constructor(){
        this.bands = [];
    }
//*Obetenemos band como argumento
    addBand( band = new Band()){
        //*añadimos una nueva banda
        this.bands.push(band);
    }     
    getBands(){
        return this.bands;
    }
//*Filtramos las bandas sacamos la banda con el id y devolvemos de nuevo la lista
    deleteBand(id = ''){
        this.bands = this.bands.filter(band => band.id !== id);
        return this.bands;
    }

    voteBand(id= '' ){
        this.bands = this.bands.map(band => {
            if(band.id === id){
                band.votes++;
                return band;
            }else{
                return band;
            }
        });
    }
}

module.exports = Bands;