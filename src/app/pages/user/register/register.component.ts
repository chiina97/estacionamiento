import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/service/token.service';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/service/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {
  user: User = new User();

  isLogged = false;

  // Inject the router so we can navigate after a successful login
  constructor(
    private readonly router: Router,
    private userService: UserService,
    private tokenService: TokenService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    }
  }

  create(): void {
    this.userService.create(this.user).subscribe({
      next: () => {
        this.toastr.success('Por favor inicie sesión', 'Cuenta creada!', {
          timeOut: 3000,
          positionClass: 'toast-top-center',
        });
        this.router.navigate(['/login']);
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
