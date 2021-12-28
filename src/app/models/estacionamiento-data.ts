export class EstacionamientoData {
    id!:number;
    horarioInicio!:number;
    usuario!:{ 
        id:number;
    }
    patente: String;
    importe!:number;
    inicioEstacionamiento!:boolean;

    constructor(inicio:boolean ,horaInicio:number,patente:String, idUser: number) {
        this.horarioInicio=horaInicio;
        this.patente =patente;
        this.usuario = {id:idUser};
        this.importe=0;
        this.inicioEstacionamiento=inicio;
    }
   
}
