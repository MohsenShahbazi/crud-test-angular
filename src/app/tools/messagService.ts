import {Injectable} from "@angular/core";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable(
  {
    providedIn: 'root',
  }
)
export class messageService {

  constructor(private snackBar: MatSnackBar) {
  }


  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action);
  }


}
