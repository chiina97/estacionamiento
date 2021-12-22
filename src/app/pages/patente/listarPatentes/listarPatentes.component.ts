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
  
  
  valorPorHs!:number;
  isDisabled=true;
  nombrePatente!:String;
  estacionamientoId!:number;
  detenerIsDisabled!:boolean;

  totalLength:any;
  page:number=1;
  today = new Date();
  timeInicio!:number;
  timeFin!:number;

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
  }

  
  iniciar(patente:Patente):void{
    //si el saldo de la cuenta corriente es mayor a 10(valor por hs) puedo iniciar
    if(this.saldo>this.valorPorHs){
      if((this.estacionamiento==undefined)||(this.estacionamiento.inicioEstacionamiento==false)){
        console.log('find en el iniciar',this.estacionamiento);
        this.timeInicio= this.today.getHours();
        this.nombrePatente=patente.patente;
       this.saveEstacionamientoData(patente);//guardo datos del estacionamiento en el backend
      }
      else{
        this.toastr.error('No puede iniciar el estacionamiento de más de una patente a la vez', 'Error', {
          timeOut: 3000, positionClass: 'toast-top-center',
        });
      }
      

    }
    else{
      this.toastr.error('El saldo disponible es insuficiente', 'Error', {
        timeOut: 3000, positionClass: 'toast-top-center',
      });
    }
  }


  saveEstacionamientoData(patente:Patente):void{
    const userId=Number(this.tokenService.getIdUser());
    //horaFin de momento es 0 cuando selecciono "detener" edita la horaFin
   this.estacionamiento = new EstacionamientoData(this.timeInicio,0,patente.id,userId);
  
    this.estacionamientoService.create(this.estacionamiento)
    .subscribe({
      next:(data)=>{
        //guardo bien los datos
        this.estacionamiento=data;
        this.estacionamientoId=this.estacionamiento.id;
        console.log('datos del estacionamiento guardado:',this.estacionamiento);
      }
    });
};

 

  
  detener(patente:Patente):void{
    //console log de this.estacionamiento devuelve undefined;
    this.findByIdPatente(patente.id);
    this.isDisabled=false; 
  }
    findByIdPatente(id:number){
    this.estacionamientoService.findByIdPatente(id)
    .subscribe({
      next:(data)=>{
        this.estacionamiento=data;
        this.estacionamientoId=data.id;
        this.updateEstacionamiendoData();//seteo el valor del horarioFin
        console.log('this.estacionamiento del metodo findByPatente',this.estacionamiento);
      }
     })
   }

   updateEstacionamiendoData():void{
    this.timeFin=this.today.getHours();
    this.estacionamiento.horarioFin=this.timeFin;
    this.estacionamiento.importe=this.estacionamiento.horarioFin-this.estacionamiento.horarioInicio;
    this.estacionamiento.inicioEstacionamiento=false;

    if(this.estacionamiento.importe==0){ //es decir,si estuve menos de 1 hs se le cobra la hora completa
      this.estacionamiento.importe=this.valorPorHs;
   }
   else{
     this.estacionamiento.importe=this.estacionamiento.importe*this.valorPorHs;    
   }
    this.estacionamientoService.update(this.estacionamientoId,this.estacionamiento)
    .subscribe(
      data=>{
      this.actualizarSaldo()
      window.location.reload();
      console.log('updateEstacionamiento',this.estacionamiento);
    
    }
    );
 
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
