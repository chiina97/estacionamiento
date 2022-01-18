import { Component, OnInit } from '@angular/core';
import { Historial } from 'src/app/models/historial';
import { HistorialService } from 'src/app/service/historial.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html'
})
export class HistorialComponent implements OnInit {
  userId!:number;
  historial:Historial[]=[];

   //paginado:
   totalLength:any;
   page:number=1;

  constructor(private historialService:HistorialService,
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
