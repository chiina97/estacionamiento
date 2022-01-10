import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/models/usuario';
import { TokenService } from 'src/app/service/token.service';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-editar-cuenta',
  templateUrl: './editar-cuenta.component.html'
})
export class EditarCuentaComponent implements OnInit {

  usuario!:Usuario;
  saldo!:number;
  
  constructor(
    private readonly router: Router,
    private usuarioService:UsuarioService,
    private tokenService: TokenService,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.mostrarInfoUsuario(Number(this.tokenService.getIdUser()));
  }
  mostrarInfoUsuario(id:number):void{
    this.usuarioService.get(id)
    .subscribe(
      data=>{this.usuario=data;
    });
   }
  
   update(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    if(this.saldo>=100){
      this.usuario.cuentaCorriente.saldo=Number(this.usuario.cuentaCorriente.saldo)+Number(this.saldo);
      this.usuarioService.updateImporte(id, this.usuario)
      .subscribe({
        next:() => {
          this.toastr.success('Se acreditaron $'+this.saldo, 'Saldo Acreditado!', {
            timeOut: 3000, positionClass: 'toast-top-center'
          });
          window.history.back();
     
        },
        error:(err) => {
        
          this.toastr.error(err.error.mensaje, 'Error', {
            timeOut: 3000,  positionClass: 'toast-top-center',
          });
      }
      });
   } 
   else{
    this.toastr.error('El saldo minimo a cargar es de $100', 'Error', {
      timeOut: 3000,  positionClass: 'toast-top-center',
    });
   }
     }
}