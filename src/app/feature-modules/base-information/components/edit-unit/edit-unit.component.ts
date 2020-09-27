import { Component, OnInit, Inject, OnDestroy, AfterViewInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http/http';
import { NgForm } from '@angular/forms';
import { TreeDTO, CreateUnitDTO } from 'src/app/feature-modules/base-information/Dto/UnitDto';
import { Subscription } from 'rxjs/internal/Subscription';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PublicService } from 'src/app/core/services/publicService';
import { PublicShareService } from 'src/app/shared/service/public-share-service';
 

@Component({
  selector: 'app-edit-unit',
  templateUrl: './edit-unit.component.html',
  styleUrls: ['./edit-unit.component.scss']
})

export class EditUnitComponent implements OnInit, OnDestroy, AfterViewInit {

  ngAfterViewInit(): void {
    setTimeout(() => {

      if (this.isEdit)
        this.getOne();
    })
  }


  constructor(
    private _dialogRef: MatDialogRef<EditUnitComponent>,
    private dialog: MatDialog,
    private _http: PublicShareService,
    private _publicService: PublicService,
    @Inject(MAT_DIALOG_DATA) private data) {

  }
  dateControl1 :string="";
  Id: string = undefined;
  isEdit: boolean = false;
  errors: string[] = [];
  entity: CreateUnitDTO = {UnitTypeId:undefined, EconomicIdentifier:'', UnitId: undefined, UnitCode: '', ParentUnitName: '', UnitName: '', Phone: '', Address: '', Logo: '', NationalCode: '', IsActive: false, ParentId: undefined };

  saveSubscription: Subscription;
  getRecordSubscription: Subscription;

  ngOnInit() {

    if (this.data.UnitId != undefined) {
      this.Id = this.data.UnitId;
      this.isEdit = true;
    }
  }


  getOne() {
    this.getRecordSubscription = this._http.getbyId("UnitPanel", this.Id).subscribe((res) => {
      this.entity = res;
    });

  }

  OnSelect(item) {  
    if(item)
    {
       this.entity.ParentId = item.UnitId;
       this.entity.ParentUnitName = item.UnitName;
    }
   }
 


  submitForm(form: NgForm) {

      if (!form.valid)
        return;
      let url = "UnitPanel/Create";
      if (this.isEdit)
        url = "UnitPanel/Edit";
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

  onRefresh(ss){
   // console.log(ss);
    }
  ngOnDestroy(): void {
    if (this.saveSubscription != null)
      this.saveSubscription.unsubscribe();
    if (this.getRecordSubscription! != null)
      this.getRecordSubscription.unsubscribe();
  }

}
