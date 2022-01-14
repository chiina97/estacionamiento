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
import { HistorialService } from 'src/app/service/historial.service';
import { Historial } from 'src/app/models/historial';
import { FeriadoService } from 'src/app/service/feriado.service';



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
  userId!:number;
  inicioEstacionamiento!:boolean;
 
  
  valorPorHs!:number;
  estacionamientoId!:number;
 
  //paginado:
  totalLength:any;
  page:number=1;
  fechaActual = new Date();
  
  
  
  
  constructor(
    private patenteService:PatenteService,
    private ciudadService:CiudadService,
    private usuarioService:UsuarioService,
    private estacionamientoService:EstacionamientoDataService,
    private toastr: ToastrService,
    private tokenService:TokenService,
    private historialService:HistorialService,
    private feriadoService:FeriadoService,
    ) {
      this.userId=Number(this.tokenService.getIdUser());
     }
 
  
  ngOnInit(): void { 
    this.obtenerInfoUsuario();
    this.obtenerInfoCiudad();
    this.listarPatentes();
    this.verificarInicioEstacionamiento();
  
 
  }

  verificarInicioEstacionamiento(){
    this.estacionamientoService.getEstado(this.userId)
    .subscribe(data=>{
      this.inicioEstacionamiento=data; //devuelve true o false
    });
  }
  
  //si es de lunes a viernes llama a verificar dias habiles que verifica si 
  //durante ese periodo de lunes a viernes es feriado
  verificarEstacionamiento(patente:String):void{
    let fechaActual = new Date();
    let dia = fechaActual.toString().split(' ')[0];
    if((dia.match("Sun")) || (dia.match("Sat"))){
      this.toastr.error('Solo puede iniciar/finalizar los dias habiles', 'Error', {
        timeOut: 3000,  positionClass: 'toast-top-center',
      });
    }else{
      this.verificarDiasHabiles(patente,fechaActual);
    }     

  }

  verificarDiasHabiles(patente:String,fechaActual:Date){
 //el boton iniciar estacionamiento del html invoca a este metodo
    //obtiene la fecha formateada igual que en la tabla feriado-> ej: "12/1".
    //se reemplaza '/' con '-' porque sino genera problemas con la url y no lo toma como string.
    //llama al metodo getByFecha que devuelve  si si el dia actual es un dia habil o no.
    let fechaFormateada = fechaActual.toLocaleDateString().split('/')[0] +"-"+ fechaActual.toLocaleDateString().split ('/')[1];
    console.log("resultado de fecha formateada: ", fechaFormateada);
    this.feriadoService.getByFecha(fechaFormateada)
    .subscribe((data:boolean)=>{
      console.log("data",data);
      if(data){
        this.toastr.error('Solo puede iniciar/finalizar los dias habiles', 'Error', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
      
      }
      else{
        if(this.inicioEstacionamiento){
          this.detener();
          
        }
        else{
          this.saveEstacionamientoData(patente);
        }
      }
    });
  }
  

  saveEstacionamientoData(nombre:String):void{
    if(this.saldo>this.ciudad.valorPorHs){
    let fechaActual = new Date();
    if(this.verificarHorarioOperable(fechaActual.getHours())){
    //horaFin de momento es 0 cuando selecciono "detener" edita la horaFin
   this.estacionamiento = new EstacionamientoData(true,fechaActual.toString(),nombre,this.userId);
    this.estacionamientoService.create(this.estacionamiento)
    .subscribe({
      next:(data)=>{
        //guardo bien los datos
       
        if(data==null){
          this.toastr.error('La patente '+nombre+' ya fue iniciada por otro usuario', 'Error', {
            timeOut: 3000,  positionClass: 'toast-top-center',
          });
        }
        else{
          this.estacionamiento=data;
         this.estacionamientoId=this.estacionamiento.id;
          this.inicioEstacionamiento= true;
        }
        
      },
      error:(err)=>{ 
      this.toastr.error(err.error.mensaje, 'Error', {
        timeOut: 3000,  positionClass: 'toast-top-center',
      });
      
     }
     
    });
  }else{
    this.toastr.error('No puede estacionar fuera del horario operable de '+this.ciudad.horarioInicio+'hs a '
    +this.ciudad.horarioFin+'hs', 'Error', {
      timeOut: 3000,  positionClass: 'toast-top-center',
    });
  }
}
else{
 

  this.toastr.error('El saldo de su cuenta es insuficiente', 'Error', {
    timeOut: 3000,  positionClass: 'toast-top-center',
  });
}
};

 verificarHorarioOperable(horaInicio:number):boolean{
    
  let horaInicioCiudad=this.ciudad.horarioInicio.split(':')[0];
  let horaFinCiudad=this.ciudad.horarioFin.split(':')[0];
  
  if((+horaInicio>=+horaInicioCiudad)&&(+horaInicio<+horaFinCiudad)){
    return true;
 
  }
  else{
     return false;

  }
 }

  
  detener():void{
   this.estacionamientoService.finalizarEstacionamiento(this.userId)
   .subscribe({
     next:(data)=>{
       this.estacionamiento=data;
       this.crearHistorial();
       this.toastr.success('Se acredito el pago de '+this.estacionamiento.importe+'$', 'Pago acreditado!', {
         timeOut: 3000, positionClass: 'toast-top-center'
       });
       setInterval(()=> window.location.reload(),1000)
   }
 });
  
   this.inicioEstacionamiento= false;
   
  }
  
  crearHistorial():void{
    let fechaActual = new Date();
    let fechaFormateada=fechaActual.toLocaleDateString()
    let fechaYhora=fechaFormateada +" " +fechaActual.toLocaleTimeString();
    const historial=new Historial("Consumo",fechaYhora,this.estacionamiento.importe,this.usuario.cuentaCorriente.saldo,this.usuario.cuentaCorriente.id);
    this.historialService.create(historial)
    .subscribe({
      next:()=>{}});
  }

   

  obtenerInfoUsuario(){
    this.usuarioService.get(this.tokenService.getIdUser())
    .subscribe(
      data =>{
        this.usuario=data;
        this.saldo=data.cuentaCorriente.saldo;
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
