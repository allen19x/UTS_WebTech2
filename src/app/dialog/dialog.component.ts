import { Component, OnInit } from '@angular/core';
import { Karyawan } from '../karyawan';
import { DataService } from '../data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  id = 'Clicked';
  error = false;
  update = true;

  constructor(
    private _snackBar: MatSnackBar,
    private ds: DataService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog : MatDialog
  ) { }

 
  ngOnInit(): void {
  }

  openId(){
    alert(this.id)
  }
  }
