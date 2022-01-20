import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Patent } from 'src/app/models/patent';
import { PatentService } from 'src/app/service/patent.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-create-patent',
  templateUrl: './create-patent.component.html',
})
export class CreatePatentComponent implements OnInit {
  namePatent!: string;
  userId!: number;

  expresiones = {
    formato: /([a-zA-Z]{3}\d{3})|([a-zA-Z]{2}\d{3}[a-zA-Z]{2})/,
  };

  constructor(
    private readonly router: Router,
    private patentService: PatentService,
    private tokenService: TokenService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}
  create(): void {
    if (this.validateFormat(this.namePatent)) {
      this.userId = Number(this.tokenService.getIdUser()); //obtengo el id del usuario
      const patent = new Patent(this.namePatent, this.userId);

      this.patentService.create(patent).subscribe({
        next: () => {
          this.toastr.success('', 'La patente se creo correctamente!', {
            timeOut: 3000,
            positionClass: 'toast-top-center',
          });
          this.router.navigate(['/estacionamiento']);
        },
        error: (err) => {
          this.toastr.error(err.error.mensaje, 'Error', {
            timeOut: 3000,
            positionClass: 'toast-top-center',
          });
        },
      });
    }
  }

  validateFormat(patent: string) {
    //en validation[0] se almacena el valor que hizo coincidencia con la expresion.
    //si el valor almacenado es distinto de la patente entonces la patente ingresada
    //contiene mas caracteres que los pedidos en la expresion. Por lo tanto es incorrecta
    const validation = patent.match(this.expresiones.formato);
    if (validation != null) {
      if (validation[0] == patent) {
        return true;
      } else {
        this.errorNotificationExpresion();
        return false;
      }
    }
    //emitir alerta de que formato debe cumplir.
    this.errorNotificationExpresion();
    return false;
  }
  errorNotificationExpresion() {
    this.toastr.error(
      'La patente debe tener el formato "AAA999" - "AA000AA "',
      'Error',
      {
        timeOut: 3000,
        positionClass: 'toast-top-center',
      }
    );
  }
}
