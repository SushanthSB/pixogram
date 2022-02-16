import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private _snackBar: MatSnackBar) { }

  error(message: string) {
    this._snackBar.open(message, "X", {
      panelClass: ['pixo-snackbar']
    });
  }
}
