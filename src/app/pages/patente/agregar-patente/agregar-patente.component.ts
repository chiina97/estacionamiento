import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Patente } from 'src/app/models/patente';
import { PatenteService } from 'src/app/service/patente.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-agregar-patente',
  templateUrl: './agregar-patente.component.html'
})
export class AgregarPatenteComponent implements OnInit {

  nombrePatente!:string;
  userId!:number;

  expresiones = {
    formato: /([a-zA-Z]{3}\d{3})|([a-zA-Z]{2}\d{3}[a-zA-Z]{2})/,
  }
 

  constructor(
    private readonly router: Router,
    private patenteService:PatenteService,
    private tokenService:TokenService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
  }
  create():void{
    if(this.validarFormato(this.nombrePatente)){
    this.userId=Number(this.tokenService.getIdUser()); //obtengo el id del usuario  
    const patente = new Patente(this.nombrePatente, this.userId);

    this.patenteService.create(patente)
    .subscribe({
      next:()=>{
        this.toastr.success('', 'La patente se creo correctamente!', {
          timeOut: 3000, positionClass: 'toast-top-center'
        }); 
        this.router.navigate(['/estacionamiento'])
      },
      error: (err) => {
          this.toastr.error(err.error.mensaje, 'Error', {
            timeOut: 3000,  positionClass: 'toast-top-center',
          });
         // window.location.reload(); 
      }
        });
   }
  }

validarFormato(patente:string){
    //en validation[0] se almacena el valor que hizo coincidencia con la expresion. 
    //si el valor almacenado es distinto de la patente entonces la patente ingresada contiene mas caracteres que los pedidos en la expresion. Por lo tanto es incorrecta
    const validation = patente.match(this.expresiones.formato);
    if(validation != null){
      if(validation[0] == patente){
        return true;
      }else{
        this.errorNotificationExpresion();
        return false;
      }
    }
    //emitir alerta de que formato debe cumplir.
    this.errorNotificationExpresion();
    return false;
}
errorNotificationExpresion(){
  this.toastr.error('La patente debe tener el formato "AAA999" - "AA000AA "', 'Error', {
    timeOut: 3000,  positionClass: 'toast-top-center',
  });
}

}
