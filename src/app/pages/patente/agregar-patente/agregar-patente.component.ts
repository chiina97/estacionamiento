import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
  errMsj!: string;

  constructor(
    private readonly router: Router,
    private patenteService:PatenteService,
    private tokenService:TokenService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
  }
  create():void{
    this.userId=Number(this.tokenService.getIdUser()); //obtengo el id del usuario  
    const patente = new Patente(this.nombrePatente, this.userId);

    this.patenteService.create(patente)
    .subscribe({
      next:(res)=>{
        this.toastr.success('', 'La patente se creo correctamente!', {
          timeOut: 3000, positionClass: 'toast-top-center'
        }); 
        this.router.navigate(['/estacionamiento'])
      },
      error: (err) => {
        for(let e of err.error.errors){
          this.toastr.error(e, 'Error', {
            timeOut: 3000,  positionClass: 'toast-top-center',
          });
        }
      }
        });
   }

}
