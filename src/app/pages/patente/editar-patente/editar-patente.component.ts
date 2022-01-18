import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Patente } from 'src/app/models/patente';
import { PatenteService } from 'src/app/service/patente.service';


@Component({
  selector: 'app-editar-patente',
  templateUrl: './editar-patente.component.html'
})
export class EditarPatenteComponent implements OnInit {

  nombreDePatente:String="";
  patente!:Patente;

  idPatente!:number;

  constructor(
    private router: Router,
    private patenteService:PatenteService,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,) 
    {
      this.idPatente = this.activatedRoute.snapshot.params['id'];
     }

  ngOnInit() {
    this.findById();
  }

  findById(){
    this.patenteService.findById(this.idPatente)
    .subscribe({
      next:(data) => {
        this.nombreDePatente = data.patente;
        this.patente=data;
      },
      error:(err) => {
      
        this.toastr.error(err.error.mensaje, 'Error', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
        this.router.navigate(['/estacionamiento']);
      }})
  }

  update(): void {
    this.patente.patente=this.nombreDePatente;
    this.patenteService.update(this.idPatente, this.patente)
    .subscribe({
      next:() => {
        this.toastr.success('', 'Patente Actualizada', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.router.navigate(['/estacionamiento']);
      },
      error:(err) => {
        for(let e of err.error.errors){
        this.toastr.error(e, 'Error', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
      }
     
      }
    });
  }

}
