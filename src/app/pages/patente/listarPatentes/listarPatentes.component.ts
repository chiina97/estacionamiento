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
import { HistorialService } from 'src/app/service/historial.service';
import { Historial } from 'src/app/models/historial';



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
    private usuarioService:UsuarioService,
    private estacionamientoService:EstacionamientoDataService,
    private toastr: ToastrService,
    private tokenService:TokenService,
    private historialService:HistorialService
    ) {
      this.userId=Number(this.tokenService.getIdUser());
     }
 
  
  ngOnInit(): void { 
    this.obtenerInfoUsuario();
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
 
      if(this.inicioEstacionamiento){
        this.detener();
      }
      else{
        this.saveEstacionamientoData(patente);
      }
        

  }


  saveEstacionamientoData(nombre:String):void{
    let hoy= new Date();
   this.estacionamiento = new EstacionamientoData(true,hoy.toString(),nombre,this.userId);
    this.estacionamientoService.create(this.estacionamiento)
    .subscribe({
      next:(data)=>{
        //guardo bien los datos
          this.estacionamiento=data;
         this.estacionamientoId=this.estacionamiento.id;
          this.inicioEstacionamiento= true;
        
        
      },
      error:(err)=>{ 
        console.log("error del create",err);
      this.toastr.error(err.error.mensaje, 'Error', {
        timeOut: 3000,  positionClass: 'toast-top-center',
      });
      
     }
     
    });
 
  }


 
  detener():void{
   this.estacionamientoService.finalizarEstacionamiento(this.userId)
   .subscribe({
     next:(data)=>{
       this.estacionamiento=data;
       this.crearHistorial();
       this.inicioEstacionamiento= false;
       this.toastr.success('Se acredito el pago de '+this.estacionamiento.importe+'$', 'Pago acreditado!', {
         timeOut: 3000, positionClass: 'toast-top-center'
       });
       setInterval(()=> window.location.reload(),1000)
   },
   error:(err)=>{
    this.toastr.error(err.error.mensaje, 'Error', {
      timeOut: 3000,  positionClass: 'toast-top-center',
    });
   }
 });
  
  
   
  }
  
  crearHistorial():void{
    let cuentaActual=this.usuario.cuentaCorriente.saldo-this.estacionamiento.importe;
    const historial=new Historial("Consumo",this.estacionamiento.importe,cuentaActual,this.usuario.cuentaCorriente.id);
    this.historialService.create(historial)
    .subscribe({
      next:()=>{}});
  }

   

  obtenerInfoUsuario(){
    this.usuarioService.findById(this.tokenService.getIdUser())
    .subscribe(
      data =>{
        this.usuario=data;
        this.saldo=data.cuentaCorriente.saldo;
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

  
  eliminar(patente:Patente):void{
    if (confirm("¿Estás seguro de eliminar la patente "+ patente.patente + "?")) {
    this.patenteService.delete(patente.id)
    .subscribe({
      next:() => {

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
}
