export class EstacionamientoData {
    id!:number;
    horarioInicio!:number;
    horarioFin!:number;
    usuario!:{ 
        id:number;
    }
    patente!:{
        id:number;
    }
    importe!:number;
    constructor(horaInicio:number,horaFin:number,idPatente:number, idUser: number) {
        this.horarioInicio=horaInicio;
        this.horarioFin=horaFin;
        this.patente ={id:idPatente}
        this.usuario = {id:idUser};
        this.importe=0;
    }
   
}
