import { Component, OnInit, } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Ciudad } from 'src/app/models/ciudad';
import { Patente } from 'src/app/models/patente';
import { CiudadService } from 'src/app/service/ciudad.service';
import { PatenteService } from 'src/app/service/patente.service';
import { UsuarioService } from 'src/app/service/usuario.service';
import { TokenService } from 'src/app/service/token.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';



@Component({
  selector: 'app-estacionamiento',
  templateUrl: './listarPatentes.component.html'
})
export class EstacionamientoComponent implements OnInit {

  patentes:Patente[]=[];
  ciudad!:Ciudad;
  usuario!:Usuario;
  saldo!:number;
  
  importe=0;
  yaInicio=false;
  valorPorHs!:number;
  isDisabled=true;

  totalLength:any;
  page:number=1;
  today = new Date();
  timeInicio!:number;
  timeFin!:number;

  constructor(
    private patenteService:PatenteService,
    private ciudadService:CiudadService,
    private usuarioService:UsuarioService,
    private toastr: ToastrService,
    private tokenService:TokenService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    ) { }
 
  
  ngOnInit(): void { 
    this.obtenerInfoUsuario();
    this.obtenerInfoCiudad();
    this.listarPatentes();
    this.mostrarSaldo(); 
  }

  iniciar():void{
    //si el saldo de la cuenta corriente es mayor a 10(valor por hs) puedo iniciar
    if(this.saldo>this.valorPorHs){
       this.yaInicio=true;
       this.timeInicio= this.today.getHours();
    }
    else{
      this.toastr.error('El saldo disponible es insuficiente', 'Error', {
        timeOut: 3000, positionClass: 'toast-top-center',
      });
    }
  }

  detener():void{
    this.isDisabled=false;
    this.timeFin=this.today.getHours() 
  
    this.importe=this.timeFin-this.timeInicio;
    if(this.importe==0){ //es decir,si estuve menos de 1 hs se le cobra la hora completa
       this.importe=this.valorPorHs;
    }
    else{
      this.importe=this.importe*this.valorPorHs;
    }
  }


  mostrarSaldo():void{
    this.usuarioService.get(this.tokenService.getIdUser())
    .subscribe(
      data=>{    
        this.saldo=data.cuentaCorriente.saldo;
      }
    )
  }

  pagar():void{
    this.yaInicio=false;
    this.isDisabled=true;
    this.usuario.cuentaCorriente.saldo=this.usuario.cuentaCorriente.saldo-this.importe;
    this.actualizarSaldo();
    this.importe=0;
    window.location.reload();
  }

  actualizarSaldo(){;
    this.usuarioService.update(this.tokenService.getIdUser(), this.usuario)
    .subscribe({
      next:() => {
        this.toastr.success('', 'Pago acreditado!', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.router.navigate(['/estacionamiento']);
      }, 
    });
  }

  obtenerInfoUsuario(){
    this.usuarioService.get(this.tokenService.getIdUser())
    .subscribe(
      data =>{
        this.usuario=data;
      }
    );
  }
  obtenerInfoCiudad(){
    this.ciudadService.getDataCiudad()
    .subscribe(
      data=>{
        this.ciudad=data[0];
        this.valorPorHs=this.ciudad.valorPorHs;
      }
    );
  }
  listarPatentes():void{
    this.patenteService.getAll(this.tokenService.getIdUser())
    .subscribe(
      data => {
        this.patentes = data;
      }
    );
  }

  
  eliminar(id:number):void{
    this.patenteService.delete(id)
    .subscribe({
      next:(data) => {

        this.toastr.success('', 'Patente Eliminada', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.listarPatentes();
      },
      error:(err) => {
        this.toastr.error(err.error.mensaje, 'Error', {
          timeOut: 3000, positionClass: 'toast-top-center',
        });
      }
    })
  }

}
