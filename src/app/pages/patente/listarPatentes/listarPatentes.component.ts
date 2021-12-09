import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Patente } from 'src/app/models/patente';
import { PatenteService } from 'src/app/service/patente.service';
import { TokenService } from 'src/app/service/token.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-estacionamiento',
  templateUrl: './listarPatentes.component.html'
})
export class EstacionamientoComponent implements OnInit {

  patentes:Patente[]=[];
  isAdmin=false;

  totalLength:any;
  page:number=1;

  constructor(
    private patenteService:PatenteService,
    private toastr: ToastrService,
    private tokenService:TokenService
    ) {}
 
  
  ngOnInit(): void { 
    this.listarPatentes();
    this.isAdmin = this.tokenService.isAdmin();// chequear

  }

  listarPatentes():void{
    this.patenteService.getAll(this.tokenService.getIdUser())
    .subscribe(
      data => {
        this.patentes = data;
      }
    );
  }

  
  eliminar(id:number):void{
    this.patenteService.delete(id)
    .subscribe({
      next:(data) => {

        this.toastr.success('', 'Patente Eliminada', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.listarPatentes();
      },
      error:(err) => {
        this.toastr.error(err.error.mensaje, 'Error', {
          timeOut: 3000, positionClass: 'toast-top-center',
        });
      }
    })
  }

}
