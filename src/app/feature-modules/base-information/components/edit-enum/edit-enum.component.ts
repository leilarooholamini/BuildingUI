import { Component, OnInit, Inject, OnDestroy, AfterViewInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http/http';
import { NgForm } from '@angular/forms';
import { CreateEnumDto } from 'src/app/feature-modules/base-information/Dto/EnumDto';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { PublicService } from 'src/app/core/services/publicService';
import { PublicShareService } from 'src/app/shared/service/public-share-service';
import { Subscription } from 'rxjs/internal/Subscription';
 
import { TreeDTO } from '../../Dto/UnitDto';

@Component({
  selector: 'app-edit-enum',
  templateUrl: './edit-enum.component.html',
  styleUrls: ['./edit-enum.component.scss']
}) 

export class EditEnumComponent implements OnInit, OnDestroy, AfterViewInit {
  ngAfterViewInit(): void {

    setTimeout(() => {

      if (this.isEdit)
        this.getOne();
    })
  }
  saveSubscription: Subscription;
  getRecordSubscription: Subscription;

  constructor(
    private _dialogRef: MatDialogRef<EditEnumComponent>,
    private _http: PublicShareService,
    private dialog: MatDialog,
    private _publicService: PublicService,
    @Inject(MAT_DIALOG_DATA) private data) {

  }
  Id: string = undefined;
  isEdit: boolean = false;
  errors: string[] = [];
  entity: CreateEnumDto = { EnumCode: '', EnumName: '',ParentName:'',ParentId:undefined, EnumTypeCode: '', EnumId: undefined };

  ngOnInit() {

    if (this.data.EnumId != undefined) {
      this.Id = this.data.EnumId;
      this.isEdit = true;
    }
    this.entity.EnumTypeCode = this.data.EnumTypeCode;
  }


  getOne() {

    this.getRecordSubscription = this._http.getAll(`EnumPanel?id=${this.Id}&EnumTypeCode=${this.entity.EnumTypeCode }`).subscribe((res) => {
      this.entity = res;
    });

  }


  OnSelect(item) {  
    if(item)
    {
       this.entity.ParentId = item.UnitId;
       this.entity.ParentName = item.UnitName;
    }
   }

  submitForm(form: NgForm) {
    if (!form.valid)
      return;
    let url = "EnumPanel/Create";
    if (this.isEdit)
      url = "EnumPanel/Edit";
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
