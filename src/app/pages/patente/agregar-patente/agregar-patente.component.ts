import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Patente } from 'src/app/models/patente';
import { PatenteService } from 'src/app/service/patente.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-agregar-patente',
  templateUrl: './agregar-patente.component.html',
  styleUrls: ['./agregar-patente.component.scss']
})
export class AgregarPatenteComponent implements OnInit {

  nombrePatente!:string;
  userId!:number;

  constructor(
    private readonly router: Router,
    private patenteService:PatenteService,
    private tokenService:TokenService) { }

  ngOnInit(): void {
  }
  create():void{
    this.userId=Number(this.tokenService.getIdUser()); //obtengo el id del usuario  
    console.log('userId',this.userId);
    console.log('nombre de patente',this.nombrePatente);
    const patente = new Patente(this.nombrePatente, this.userId);
    console.log('patente object',patente);
    this.patenteService.create(patente)
    .subscribe(
      res=>{
        console.log('res',res);
        this.router.navigate(['/estacionamiento'])
      });
   }

}
