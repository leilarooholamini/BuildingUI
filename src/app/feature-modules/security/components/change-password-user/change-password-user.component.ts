import { Component, OnInit, Inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http/http';
import { Subscription } from 'rxjs/internal/Subscription';
import { ChengePasswordDto } from 'src/app/feature-modules/security/Dto/UserDto';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PublicService } from 'src/app/core/services/publicService';
import { PublicShareService } from 'src/app/shared/service/public-share-service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-change-password-user',
  templateUrl: './change-password-user.component.html',
  styleUrls: ['./change-password-user.component.scss']
})
export class ChangePasswordUserComponent implements OnInit {

  constructor( private _dialogRef: MatDialogRef<ChangePasswordUserComponent>,
 
    private _http: PublicShareService,
    private _publicService: PublicService,
    @Inject(MAT_DIALOG_DATA) private data) { }
    errors: string[] = [];
    entity:ChengePasswordDto={UserId:'',Password:'',RePassword:'' };
    saveSubscription:Subscription;
  ngOnInit() {
    if (this.data.UserId != undefined) {
     this.entity.UserId=   this.data.UserId;
      }
   }



  submitForm(form: NgForm) {
   
       
          if (!form.valid)
            return;
          let url = "UserPanel/ChengeUserPassword";
    
          this.errors = [];
          this.saveSubscription = this._http.Save(url, this.entity, true).subscribe(
            (res: any) => {
              this._publicService.onSuccessMessege(res);
              this._dialogRef.close(true);
            },
            (responseError: HttpErrorResponse) => {
              this.errors = this._publicService.processModelStateErrors(form, responseError);
            });
      }
      onCancel() { 
        this._dialogRef.close(false);
      }
      
      ngOnDestroy(): void {
          
        if (this.saveSubscription != null)
          this.saveSubscription.unsubscribe();
        
      }

      

}
