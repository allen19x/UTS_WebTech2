import { Component, OnInit } from '@angular/core';
import { Karyawan } from '../karyawan';
import { DataService } from '../data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-karyawan-form',
  templateUrl: './karyawan-form.component.html',
  styleUrls: ['./karyawan-form.component.scss']
})
export class KaryawanFormComponent implements OnInit {
  karyawan: Karyawan = {
    _id: '',
    namaKaryawan: '',
    tunjangan: '',
    gaji: '',
    divisiPekerjaan: ''
  };
  id = null;
  error = false;
  update = true;

  constructor(
    private _snackBar: MatSnackBar,
    private ds: DataService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog
  ) { }

  karyawanForm = this.formBuilder.group({
    namaKaryawan: ["", [Validators.required]],
    tunjangan: ["", [Validators.required]],
    gaji: ["", [Validators.required]],
    divisiPekerjaan: ["", [Validators.required]],
  })

  namaKaryawan = this.karyawanForm.get("namakaryawan");
  tunjangan = this.karyawanForm.get("tunjangan");
  gaji = this.karyawanForm.get("gaji");
  divisiPekerjaan = this.karyawanForm.get("divisiPekerjaan");

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  openDialog() {
    this.dialog.open(DialogComponent);
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      // jika ada parameter id di URL
      if (params.get('id')) {
        this.id = params.get('id');

        this.ds.getKaryawan(this.id).subscribe(
          response => {
            this.karyawan = response as Karyawan;
          },
          err => {
            console.log(err);
            this.error = true;
          }
        );
      } else {
        this.update = false;
      }
    });
  }

  postKaryawan() {
    const param = this.karyawanForm.value;
    delete param.check;
    this.ds.postKaryawan(this.karyawan).subscribe(response => {
      // tampilkan notifikasi
      this.openSnackBar("Karyawan Added", null)
      this.router.navigate(['/main']);
    });
  }

  deleteKaryawan() {
    this.ds.deleteKaryawan(this.karyawan).subscribe(
      response => {
        // tampilkan notifikasi
        this.openSnackBar("Karyawan Deleted", null)
        this.router.navigate(['/main']);
      },
      err => {
        console.log(err);
      }
    );
  }

  updateKaryawan() {
    this.ds.updateKaryawan(this.karyawan).subscribe(
      response => {
        // tampilkan notifikasi
        this.openSnackBar("Karyawan Updated", null)
        this.router.navigate(['/main']);
      },
      err => {
        console.log(err);
      }
    );
  }
} 