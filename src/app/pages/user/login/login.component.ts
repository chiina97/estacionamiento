import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/service/token.service';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/service/user.service';
import { ToastrService } from 'ngx-toastr';
import { LocalizationService } from 'src/app/internationalization/localization.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  user: User = new User();

  // Inject the router so we can navigate after a successful login
  constructor(
    private readonly router: Router,
    private userService: UserService,
    private tokenService: TokenService,
    private toastr: ToastrService,
    private localService: LocalizationService
  ) {}

  ngOnInit(): void {}

  public authenticate(): void {
    //consumo api de autenticar
    this.userService.authenticate(this.user).subscribe({
      next: (res) => {
        this.tokenService.setToken(res.token);
        this.router.navigate(['/home']);
        window.location.reload();
      },
      error: () => {
        this.toastr.error(this.localService.translate('error.login'), 'Error', {
          timeOut: 3000,
          positionClass: 'toast-top-center',
        });
      },
    });
  }
}
