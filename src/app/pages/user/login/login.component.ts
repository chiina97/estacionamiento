import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/service/token.service';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/service/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  
  
  errMsj!: string;
  user:User= new User();

  // Inject the router so we can navigate after a successful login
  constructor(
    private readonly router: Router,
    private userService:UserService,
    private tokenService: TokenService,
    private toastr: ToastrService
    ) {}
  
    ngOnInit():void {
    }

  public authenticate():void {
    //consumo api de autenticar
    this.userService.authenticate(this.user)
   .subscribe({
    next: (res) => {
      this.tokenService.setToken(res.token);
      this.router.navigate(['/home']);
      window.location.reload(); 
    
     },
     error: (err) => {

      this.toastr.error('El telefono/contraseña es incorrecta', 'Error', {
        timeOut: 3000,  positionClass: 'toast-top-center',
      });
      
     }
    }
);
   
  }
 
}
