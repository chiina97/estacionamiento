import { Usuario } from "./usuario";

export class Patente {
    id!:number;
    patente!:String; 
    usuario!:Usuario;
    constructor(patente: string, idUser: number) {
        this.patente = patente;
        this.usuario.id = idUser;
    }
    }