 

import { Component, OnInit, Inject, OnDestroy, AfterViewInit } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
 
import { PublicService } from 'src/app/core/services/publicService';
 
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { PublicShareService } from 'src/app/shared/service/public-share-service';
import { CreateUserRoleDto } from '../../Dto/UserDto';
import { TreeDTO } from 'src/app/feature-modules/base-information/Dto/UnitDto';
 
 

@Component({
  selector: 'app-edit-user-role',
  templateUrl: './edit-user-role.component.html',
  styleUrls: ['./edit-user-role.component.scss']
})
export class EditUserRoleComponent implements OnInit, OnDestroy {
 

 

  constructor(
    private _dialogRef: MatDialogRef<EditUserRoleComponent>,
    private dialog: MatDialog,
    private _http: PublicShareService,
    private _publicService: PublicService,
    @Inject(MAT_DIALOG_DATA) private data) {

  }
  dateControl1 :string="";
  Id: string = undefined;
  isEdit: boolean = false;
  errors: string[] = [];
  entity: CreateUserRoleDto = {  UserRoleId :undefined, UnitName:'',  UserId :undefined,   RoleId :undefined,   UnitId :undefined,  }; 
  
  getRecordSubscription: Subscription;
  saveSubscription: Subscription;
 

  ngOnInit() {

    if (this.data.UserId != undefined) {
      this.entity.UserId=  this.data.UserId;
     
    }
  }

 
  OnSelect(item) {  
    if(item)
    {
       this.entity.UnitId = item.UnitId;
       this.entity.UnitName = item.UnitName;
    }
   }
   
 
  submitForm(form: NgForm) {
  
    if (!form.valid)
        return;
      let url = "UserRolePanel/Create";
    
 
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
