

import { ErrorHandler, Inject, NgZone, Injectable } from "@angular/core";
import { LocationStrategy, PathLocationStrategy } from "@angular/common";
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable()
export class AppErrorHandler implements ErrorHandler {

  constructor(
    @Inject(NgZone) private ngZone: NgZone,
    @Inject(MatSnackBar) private _snackBar: MatSnackBar,
    @Inject(LocationStrategy) private locationProvider: LocationStrategy
  ) {
  }

  handleError(error: any): void {


let message: string="";
    const url = this.locationProvider instanceof PathLocationStrategy ? this.locationProvider.path() : "";
 
 console.log(error);
   if(error.statusCode===409)
        message=error.error;

        if(error.statusCode===400)
        message=error.error;


  this.ngZone.run(() => {

   // this.publicService.onErorMessege(`${message}`);
   this._snackBar.open(`${message}`, null, { duration: 3000, panelClass: ["mat-snack-bar-container-danger"] });
  // this.authService.OnRedirectToLogin();

   });


  }
}
