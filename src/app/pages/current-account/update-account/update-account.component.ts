import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CurrentAccount } from 'src/app/models/current-account';
import { User } from 'src/app/models/user';
import { HistoryService } from 'src/app/service/history.service';
import { TokenService } from 'src/app/service/token.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-update-account',
  templateUrl: './update-account.component.html'
})
export class UpdateAccountComponent implements OnInit {

  account!:CurrentAccount;
  balance!:number;
  user!:User;
  constructor(
    private readonly router: Router,
    private userService:UserService,
    private tokenService: TokenService,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getInfoAccount();
    this.getInfoUser();
  }

  getInfoUser(){
    this.userService.findById(this.tokenService.getIdUser())
    .subscribe(
      data=>{
      this.user=data;
      })
  }
 
  getInfoAccount(){
    this.userService.findCurrentAccountById(this.tokenService.getIdUser())
    .subscribe(
      (data:any) =>{
        this.account=data;
      }
    );
  }
  
   update(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    this.account.balance=this.balance; //monto a cargar
      this.userService.updateAmount(id, this.account)
      .subscribe({
        next:() => {
       
          this.toastr.success('Se acreditaron $'+this.balance, 'Saldo Acreditado!', {
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
   
     
}
