export class EstacionamientoData {
    id!:number;
    horarioInicio!:number;
    horarioFin!:number;
    patente!:String; 
    usuario!:{ 
        id:number;
    }
    constructor(horaInicio:number,horaFin:number,patente:String, idUser: number) {
        this.horarioInicio=horaInicio;
        this.horarioFin=horaFin;
        this.patente = patente;
        this.usuario = {id:idUser};
    }
   
}
