import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/models/usuario';
import { TokenService } from 'src/app/service/token.service';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-cuenta-corriente',
  templateUrl: './cuenta-corriente.component.html'
})

export class CuentaCorrienteComponent implements OnInit {
  
  saldo!:number;
  usuario!:Usuario;

  constructor(
    private readonly router: Router,
    private usuarioService:UsuarioService,
    private tokenService: TokenService,
    private toastr: ToastrService
  ) { }


  ngOnInit(): void {
    this.mostrarInfoUsuario(Number(this.tokenService.getIdUser()));
  }

  mostrarInfoUsuario(id:number):void{
   this.usuarioService.get(id)
   .subscribe(
     data=>{
      this.saldo=data.cuentaCorriente.saldo; 
      this.usuario=data;
   });
  }


}
