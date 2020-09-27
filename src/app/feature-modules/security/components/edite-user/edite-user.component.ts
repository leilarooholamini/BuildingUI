import { Component, OnInit, Inject, OnDestroy, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/internal/Subscription';
import { CreateUserDto } from 'src/app/feature-modules/security/Dto/UserDto';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PublicService } from 'src/app/core/services/publicService';
import { PublicShareService } from 'src/app/shared/service/public-share-service';
import { HttpErrorResponse } from '@angular/common/http/http';
 
import * as jalaliMoment from "jalali-moment";
@Component({
  selector: 'app-edite-user',
  templateUrl: './edite-user.component.html',
  styleUrls: ['./edite-user.component.scss'],

})

export class EditUserComponent implements OnInit, OnDestroy, AfterViewInit {

  ngAfterViewInit(): void {
    setTimeout(() => {

      if (this.isEdit)
        this.getOne();
    })
  }


  constructor(
    private _dialogRef: MatDialogRef<EditUserComponent>,
    private dialog: MatDialog,
    private _http: PublicShareService,
    private _publicService: PublicService,

    @Inject(MAT_DIALOG_DATA) private data) {


  }
  Birthday: string = "";
  Id: string = undefined;
  isEdit: boolean = false;
  errors: string[] = [];
  entity: CreateUserDto = { UserId: undefined, BirthDate: null, Father: '', FileId: undefined, PersonalCode: '', PersonalLastName: '', PersonalName: '', UnitId: '', UnitName: '', Password: '', UserName: '', Lock: false, RePassword: '', EmailAddress: '', PostIds: [] };

  getRecordSubscription: Subscription;
  saveSubscription: Subscription;


  ngOnInit() {


    if (this.data.UserId != undefined) {
      this.Id = this.data.UserId;
      this.isEdit = true;
    }
  }


  getOne() {
    this.getRecordSubscription = this._http.getbyId("UserPanel", this.Id).subscribe((res) => {
      this.entity = res;

    });

  }

 
  submitForm(form: NgForm) {

    if (!form.valid)
      return;
    let url = "UserPanel/Create";
    if (this.isEdit)
      url = "UserPanel/Edit";
    this.errors = [];
    this.saveSubscription = this._http.Save(url, this.entity, this.isEdit).subscribe(
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

    if (this.getRecordSubscription! != null)
      this.getRecordSubscription.unsubscribe();
  }

}
