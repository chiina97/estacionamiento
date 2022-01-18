import { Component, OnInit } from '@angular/core';
import { Historial } from 'src/app/models/historial';
import { Usuario } from 'src/app/models/usuario';
import { HistorialService } from 'src/app/service/historial.service';
import { TokenService } from 'src/app/service/token.service';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html'
})
export class HistorialComponent implements OnInit {
  userId!:number;
  idCuenta!:number;
  historial:Historial[]=[];

   //paginado:
   totalLength:any;
   page:number=1;
   today = new Date();

  constructor(private historialService:HistorialService,
    private usuarioService:UsuarioService,
    private tokenService:TokenService,) {
      this.userId=Number(this.tokenService.getIdUser());
     }

  ngOnInit(): void {
    this.getHistorial();
  }
  public getHistorial():void{
    this.historialService.findAllById(this.userId)
    .subscribe(
      data=>{
        this.historial=data;
    });
      }
  

}
