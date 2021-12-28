import { Component, OnInit, } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Ciudad } from 'src/app/models/ciudad';
import { Patente } from 'src/app/models/patente';
import { CiudadService } from 'src/app/service/ciudad.service';
import { PatenteService } from 'src/app/service/patente.service';
import { UsuarioService } from 'src/app/service/usuario.service';
import { TokenService } from 'src/app/service/token.service';
import {  Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { EstacionamientoData } from 'src/app/models/estacionamiento-data';
import { EstacionamientoDataService } from 'src/app/service/estacionamiento-data.service';
import { AnimationDriver } from '@angular/animations/browser';



@Component({
  selector: 'app-estacionamiento',
  templateUrl: './listarPatentes.component.html'
})
export class EstacionamientoComponent implements OnInit {

  patentes:Patente[]=[];
  ciudad!:Ciudad;
  estacionamiento!:EstacionamientoData;
  usuario!:Usuario;

  saldo!:number;
  inicioEstacionamiento!:boolean;
 
  
  valorPorHs!:number;
  estacionamientoId!:number;
 
  //paginado:
  totalLength:any;
  page:number=1;
  today = new Date();
  
  
  constructor(
    private patenteService:PatenteService,
    private ciudadService:CiudadService,
    private usuarioService:UsuarioService,
    private estacionamientoService:EstacionamientoDataService,
    private toastr: ToastrService,
    private tokenService:TokenService,
    private router: Router,
    ) {
     
     }
 
  
  ngOnInit(): void { 
    this.obtenerInfoUsuario();
    this.obtenerInfoCiudad();
    this.listarPatentes();
    this.mostrarSaldo(); 
    this.verificarInicioEstacionamiento();
  }

  verificarInicioEstacionamiento(){
    const userId=Number(this.tokenService.getIdUser());
    this.estacionamientoService.getEstado(userId)
    .subscribe(data=>{
      this.inicioEstacionamiento=data;
    });
  }
  
  iniciar(patente:Patente):void{
    if(this.saldo>this.ciudad.valorPorHs){
     
        this.saveEstacionamientoData(patente);//guardo datos del estacionamiento en el backend
  
     
    }
    else{
      this.toastr.error('El saldo de su cuenta es insuficiente', 'Error', {
        timeOut: 3000,  positionClass: 'toast-top-center',
      });
    }
    

  }


  saveEstacionamientoData(patente:Patente):void{
    let today = new Date();
    const userId=Number(this.tokenService.getIdUser());
    //horaFin de momento es 0 cuando selecciono "detener" edita la horaFin
   this.estacionamiento = new EstacionamientoData(true,today.getHours(),patente.patente,userId);
  
    this.estacionamientoService.create(this.estacionamiento)
    .subscribe({
      next:(data)=>{
        //guardo bien los datos
        console.log('data del create',data);
        if(data==null){
          this.toastr.error('La patente '+patente.patente+' ya fue iniciada por otro usuario', 'Error', {
            timeOut: 3000,  positionClass: 'toast-top-center',
          });
        }
        else{

       
        let getHora=this.ciudad.horarioInicio.split(':')[0];
        let getHoraFin=this.ciudad.horarioFin.split(':')[0];
        
        if((data.horarioInicio>=+getHora)&&(data.horarioInicio<+getHoraFin)){
           
          this.estacionamiento=data;
          this.estacionamientoId=this.estacionamiento.id;
          this.inicioEstacionamiento= true;
  
        
        }
        else{
          this.toastr.error('No puede estacionar fuera del horario '+this.ciudad.horarioInicio+'hs a '
          +this.ciudad.horarioFin+'hs', 'Error', {
            timeOut: 3000,  positionClass: 'toast-top-center',
          });
        }
      
      }
        
      },
      error:(err)=>{ 
      this.toastr.error(err.error.mensaje, 'Error', {
        timeOut: 3000,  positionClass: 'toast-top-center',
      });
      console.log(err.error);
     }
    });
};

 

  
  detener():void{
   this.finalizarEstacionamiento();
   
  }
  finalizarEstacionamiento(){
    //inicioEstacionamiento ahora es falso,y actualizo el saldo
    const userId=Number(this.tokenService.getIdUser());
    this.estacionamientoService.finalizarEstacionamiento(userId)
    .subscribe();
    this.actualizarSaldo();//hacerlo en el backend
    this.inicioEstacionamiento= false;
    window.location.reload();
   }

   


  mostrarSaldo():void{
    this.usuarioService.get(this.tokenService.getIdUser())
    .subscribe(
      data=>{    
        this.saldo=data.cuentaCorriente.saldo;
       
      }
    )
  }

 
  actualizarSaldo(){;
    this.usuario.cuentaCorriente.saldo=this.usuario.cuentaCorriente.saldo-this.estacionamiento.importe;
   
    this.usuarioService.update(this.tokenService.getIdUser(), this.usuario)
    .subscribe({
      next:() => {
        this.toastr.success('', 'Pago acreditado!', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        console.log('saldo actualizado',this.usuario.cuentaCorriente.saldo);
        this.estacionamiento.importe=0;
        console.log('cuenta corriente actualizada',this.usuario.cuentaCorriente.saldo);
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
