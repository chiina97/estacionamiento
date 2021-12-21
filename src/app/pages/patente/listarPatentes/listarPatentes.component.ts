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
       this.updatePatente(patente,true);//cambie inicioEstacionamiento=true
       this.timeInicio= this.today.getHours();
       this.nombrePatente=patente.patente;
      this.saveEstacionamientoData(patente);//guardo datos del estacionamiento en el backend

    }
    else{
      this.toastr.error('El saldo disponible es insuficiente', 'Error', {
        timeOut: 3000, positionClass: 'toast-top-center',
      });
    }
  }
  updatePatente(patente:Patente,valor:boolean){
    let patenteAux=new Patente(patente.patente,patente.usuario.id);
    patenteAux.id=patente.id;
    patenteAux.inicioEstacionamiento=valor;
    this.patenteService.update(patente.id,patenteAux)
    .subscribe({
      next:()=>{
      window.location.reload();
      }
    })
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
    if(patente.inicioEstacionamiento==true){//esta parte no esta bien
      this.detenerIsDisabled=true;
    }

  }

   findByIdPatente(id:number){
    this.estacionamientoService.findByIdPatente(id)
    .subscribe({
      next:(data)=>{
        console.log('estoy en el metodo findByPatente')
        this.estacionamiento=data;
        console.log('this.estacionamiento',this.estacionamiento);
        this.estacionamientoId=data.id;
        console.log('this.estacionamientoId',this.estacionamientoId);
        this.updateEstacionamiendoData();//seteo el valor del horarioFin
      },
      error:(err)=>{
        console.log('err',err.error);
      }}
    )
   }

   updateEstacionamiendoData():void{
    this.timeFin=this.today.getHours();
    this.estacionamiento.horarioFin=this.timeFin;
    this.estacionamiento.importe=this.estacionamiento.horarioFin-this.estacionamiento.horarioInicio;
  
    this.estacionamientoService.update(this.estacionamientoId,this.estacionamiento)
    .subscribe();


    if(this.estacionamiento.importe==0){ //es decir,si estuve menos de 1 hs se le cobra la hora completa
      this.estacionamiento.importe=this.valorPorHs;
   }
   else{
     this.estacionamiento.importe=this.estacionamiento.importe*this.valorPorHs;  
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

  pagar(patente:Patente):void{
    this.detenerIsDisabled=false;
    this.isDisabled=true;
    this.usuario.cuentaCorriente.saldo=this.usuario.cuentaCorriente.saldo-this.estacionamiento.importe;
    this.actualizarSaldo();//descuento el importe de la cuenta corriente
    this.estacionamiento.importe=0;//el importe a pagar ahora es 0
    this.updatePatente(patente,false); //inicioEstacionamiento=false
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
