import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Patente } from 'src/app/models/patente';
import { PatenteService } from 'src/app/service/patente.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-editar-patente',
  templateUrl: './editar-patente.component.html',
  styleUrls: ['./editar-patente.component.scss']
})
export class EditarPatenteComponent implements OnInit {

  patente!:Patente;

  constructor(
    private router: Router,
    private patenteService:PatenteService,
    private tokenService:TokenService,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params['id'];
    this.patenteService.get(id)
    .subscribe({
      next:(data) => {
        this.patente = data;
      },
      error:(err) => {
        this.toastr.error(err.error.mensaje, 'Error', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
        this.router.navigate(['/estacionamiento']);
      }}
    );
  }

  update(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    this.patenteService.update(id, this.patente)
    .subscribe({
      next:(data) => {
        this.toastr.success('', 'Patente Actualizada', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.router.navigate(['/estacionamiento']);
      },
      error:(err) => {
        this.toastr.error(err.error.mensaje, 'Error', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
      }
    });
  }

}
