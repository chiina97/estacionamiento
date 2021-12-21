
export class Patente {
    id!:number;
    patente!:String; 
    usuario!:{ //??
        id:number;
    }
    inicioEstacionamiento!:boolean;
    
    constructor(patente: String, idUser: number) {
        this.inicioEstacionamiento=false;
        this.patente = patente;
        this.usuario = {id:idUser};
    }
    }