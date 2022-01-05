export class EstacionamientoData {
    id!:number;
    horarioInicio!:String;
    usuario!:{ 
        id:number;
    }
    patente: String;
    importe!:number;
    inicioEstacionamiento!:boolean;

    constructor(inicio:boolean ,horaInicio:String,patente:String, idUser: number) {
        this.horarioInicio=horaInicio;
        this.patente =patente;
        this.usuario = {id:idUser};
        this.inicioEstacionamiento=inicio;
    }
   
}
