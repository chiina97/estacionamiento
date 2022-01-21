import { Component, OnInit } from '@angular/core';
import { History } from 'src/app/models/history';
import { HistoryService } from 'src/app/service/history.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
})
export class HistoryComponent implements OnInit {
  history: History[] = [];

  //paginado:
  totalLength: any;
  page: number = 1;

  constructor(
    private historyService: HistoryService,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    this.getHistory();
  }
  public getHistory(): void {
    const userId = Number(this.tokenService.getIdUser());
    this.historyService.findAllById(userId).subscribe((data) => {
      this.history = data;
    });
  }
}
