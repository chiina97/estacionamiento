import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/service/token.service';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/service/usuario.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.component.html'
})
export class RegistrarseComponent implements OnInit {
  

    usuario:Usuario= new Usuario();
   
    errMsj!: string;
    isLogged = false;


  // Inject the router so we can navigate after a successful login
  constructor(
    private readonly router: Router,
    private usuarioService:UsuarioService,
    private tokenService: TokenService,
    private toastr: ToastrService) {}

    ngOnInit() {
      if (this.tokenService.getToken()) {
        this.isLogged = true;
      }
    }

  create():void{
   this.usuarioService.create(this.usuario)
   .subscribe({
    next: () => {
    this.toastr.success('Por favor inicie sesión', 'Cuenta creada!', {
      timeOut: 3000, positionClass: 'toast-top-center'
    }); 
    this.router.navigate(['/login'])
   },
   error: (err) => {
    this.errMsj = err.error.mensaje;
    this.toastr.error(this.errMsj, 'Error', {
      timeOut: 3000,  positionClass: 'toast-top-center',
    });
  }
  });
  }

}
