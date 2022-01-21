import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CurrentAccount } from 'src/app/models/current-account';
import { User } from 'src/app/models/user';
import { TokenService } from 'src/app/service/token.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-current-account',
  templateUrl: './current-account.component.html',
})
export class CurrentAccountComponent implements OnInit {
  balance!: number;
  user!: User;
  account!: CurrentAccount;

  constructor(
    private readonly router: Router,
    private userService: UserService,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    this.getInfoAccount();
    this.getInfoUser(Number(this.tokenService.getIdUser()));
  }

  getInfoUser(id: number): void {
    this.userService.findById(id).subscribe((data) => {
      this.user = data;
    });
  }

  getInfoAccount() {
    this.userService
      .findCurrentAccountById(this.tokenService.getIdUser())
      .subscribe((data: any) => {
        this.account = data;
      });
  }
}
