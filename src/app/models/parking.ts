export class Parking {
    id!:number;
    startTime!:String;
    user!:{ 
        id:number;
    }
    patent!: String;
    amount!:number;
    startedParking!:boolean;

    constructor(itStarted:boolean ,startTime:String,patent:String, idUser: number) {
        this.startTime=startTime;
        this.patent =patent;
        this.user = {id:idUser};
        this.startedParking=itStarted;
    }
   
}
