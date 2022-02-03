import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/service/token.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  isLogged = false;
  username!: String;

  constructor(
    private tokenService: TokenService,
    private userService: UserService
  ) {}

  ngOnInit() {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.getInfoUser();
    } else {
      this.isLogged = false;
    }
  }

  getInfoUser() {
    this.userService.findById(this.tokenService.getIdUser()).subscribe({
      next: (data) => {
        this.username = data.username;
      },
    });
  }
}
