import { Component, OnInit } from '@angular/core';
import { History} from 'src/app/models/history';
import { HistoryService } from 'src/app/service/history.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html'
})
export class HistoryComponent implements OnInit {
  userId!:number;
  history:History[]=[];

   //paginado:
   totalLength:any;
   page:number=1;

  constructor(private historyService:HistoryService,
    private tokenService:TokenService,) {
      this.userId=Number(this.tokenService.getIdUser());
     }

  ngOnInit(): void {
    this.getHistory();
  }
  public getHistory():void{
    this.historyService.findAllById(this.userId)
    .subscribe(
      data=>{
        this.history=data;
    });
      }
  

}
