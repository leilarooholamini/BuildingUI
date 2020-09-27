import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { PublicService } from 'src/app/core/services/publicService';
import { PublicShareService } from 'src/app/shared/service/public-share-service';
import { MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
 
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { EditUserProFile } from 'src/app/feature-modules/security/Dto/UserDto';

@Component({
  selector: 'app-edit-user-profile',
  templateUrl: './edit-user-profile.component.html',
  styleUrls: ['./edit-user-profile.component.scss']
})
export class EditUserProfileComponent implements OnInit, OnDestroy, AfterViewInit {

  constructor( 
    private _dialogRef: MatDialogRef<EditUserProfileComponent>, 
    private _http: PublicShareService,
    private _publicService: PublicService
  ){
   }
   entity: EditUserProFile = {  BirthDate: null, Father: '', FileId: undefined, PersonalCode: '', PersonalLastName: '', PersonalName: '',  Password: '',  RePassword: '', E_LanguageId:null,E_ThemId:null };

   errors: string[] = [];
   getRecordSubscription: Subscription;
   saveSubscription: Subscription;

  ngAfterViewInit(): void {
    setTimeout(() => {
 
        this.getCurrentUserProfile();
    })
  }

  ngOnInit() {
  }



  getCurrentUserProfile() {
    this.getRecordSubscription = this._http.getAll("UserPanel/GetUserProfile").subscribe((res) => {
      this.entity = res;
    });
  }


  submitForm(form: NgForm) {
    if (!form.valid)
      return;
    let url = "UserPanel/EditUserProfile";
   

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
    this.getRecordSubscription.unsubscribe();


  }

 
}
