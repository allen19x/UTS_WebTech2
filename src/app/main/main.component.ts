import { Component, OnInit } from '@angular/core';
import { Karyawan } from '../karyawan';
import { DataService } from '../data.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  karyawans: Karyawan[];
  error:boolean;
  displayedColumns: string[] = ['namaKaryawan', 'gaji', 'divisiPekerjaan', 'tunjangan'];

  constructor(private ds: DataService,) {}

  ngOnInit(): void {
    this.ds.getKaryawans().subscribe(
      response => {
        this.karyawans = response as Karyawan[];
      },
      err => {
        console.log(err);
        this.error = true;
      }
    );
  }
}
