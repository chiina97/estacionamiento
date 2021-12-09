import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/service/token.service';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/service/usuario.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  
  
  errMsj!: string;
  usuario:Usuario= new Usuario();

  // Inject the router so we can navigate after a successful login
  constructor(
    private readonly router: Router,
    private usuarioService:UsuarioService,
    private tokenService: TokenService,
    private toastr: ToastrService
    ) {}
  
    ngOnInit():void {
    }

  public autenticar():void {
    //consumo api de autenticar
    this.usuarioService.autenticar(this.usuario)
   .subscribe({
    next: (res) => {
      this.tokenService.setToken(res.token);
      this.router.navigate(['/home']);
      window.location.reload(); 
    
     },
     error: (err) => {
      this.errMsj = err.error.mensaje;
      this.toastr.error(this.errMsj, 'Error', {
        timeOut: 3000,  positionClass: 'toast-top-center',
      });
      console.log(err.error);
     }
    }
);
   
  }
 
}
