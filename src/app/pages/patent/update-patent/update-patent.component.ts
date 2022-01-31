import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Patent } from 'src/app/models/patent';
import { PatentService } from 'src/app/service/patent.service';

@Component({
  selector: 'app-update-patent',
  templateUrl: './update-patent.component.html',
})
export class UpdatePatentComponent implements OnInit {
  numberPatent: String = '';
  patent!: Patent;

  idPatent!: number;

  constructor(
    private router: Router,
    private patentService: PatentService,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute
  ) {
    this.idPatent = this.activatedRoute.snapshot.params['id'];
  }

  ngOnInit() {
    this.findById();
  }

  findById() {
    this.patentService.findById(this.idPatent).subscribe({
      next: (data) => {
        this.numberPatent = data.patent;
        this.patent = data;
      },
      error: (err) => {
        this.toastr.error(err.error.mensaje, 'Error', {
          timeOut: 3000,
          positionClass: 'toast-top-center',
        });
        this.router.navigate(['/estacionamiento']);
      },
    });
  }

  update(): void {
    this.patent.patent = this.numberPatent;
    this.patentService.update(this.idPatent, this.patent).subscribe({
      next: () => {
        this.toastr.success('', 'Patente Actualizada', {
          timeOut: 3000,
          positionClass: 'toast-top-center',
        });
        this.router.navigate(['/estacionamiento']);
      },
      error: (err) => {
        this.toastr.error(err.error.mensaje, 'Error', {
          timeOut: 3000,
          positionClass: 'toast-top-center',
        });
      },
    });
  }
}
