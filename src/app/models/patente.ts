
export class Patente {
    id!:number;
    patente!:String; 
    usuario!:{ //??
        id:number;
    }
    
    
    constructor(patente: String, idUser: number) {
        this.patente = patente;
        this.usuario = {id:idUser};
    }
    }