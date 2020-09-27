import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http/http';
import { NgForm } from '@angular/forms';
import { MenuPermissionDTO, CreateRoleDto } from '../../Dto/RoleDto';
import { Subscription } from 'rxjs/internal/Subscription';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PublicShareService } from 'src/app/shared/service/public-share-service';
import { PublicService } from 'src/app/core/services/publicService';

@Component({
  selector: 'app-edit-role',
  templateUrl: './edit-role.component.html',
  styleUrls: ['./edit-role.component.scss']
})

export class EditRoleComponent implements OnInit, AfterViewInit {

  constructor(private _dialogRef: MatDialogRef<EditRoleComponent>,
    private _http: PublicShareService,
    private _publicService: PublicService,
    @Inject(MAT_DIALOG_DATA) private data) {
  }


  Id: string = undefined;
  isEdit: boolean = false;
  errors: string[] = [];
  entity: CreateRoleDto = { PermissionIds: [], RoleCode: '', RoleId: undefined, RoleName: '' }
  roleSubscription: Subscription;
  saveSubscription: Subscription;
  permissionListSubscription: Subscription;
  menuPermissionList: Array<MenuPermissionDTO> = [];
  masterChecked: boolean = false;
  masterIndeterminate: boolean = false

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.onPopulateMenuPermissionList();
      if (this.isEdit)
        this.getOne();
    })
  }
  ngOnInit() {
    if (this.data.RoleId != undefined) {
      this.Id = this.data.RoleId;
      this.isEdit = true;
    }
  }


  getOne() {
    if (this.isEdit) 
      this.roleSubscription = this._http.getbyId("RolePanel", this.Id).subscribe((res) => {
        this.entity = res;
        for (let item of Object.values(this.menuPermissionList))
          for (let itemd of Object.values(item.Pemissionlist)) {
            itemd.Checked = this.entity.PermissionIds.some(c => c == itemd.PermissionId);
          }
      });
  }
  onPopulateMenuPermissionList() {
    this.permissionListSubscription = this._http.getAll("Permissions/PermissionList").subscribe((res: Array<MenuPermissionDTO>) => {
      this.menuPermissionList = res;
      this.getOne();
    });
  }

  onlistChange() {
    let checkedCount = 0;
    let lengthPermission = 0;
    for (let item of Object.values(this.menuPermissionList))
      for (let itemd of Object.values(item.Pemissionlist)) {
        if (itemd.Checked)
          checkedCount++;
        lengthPermission++;
      }
    if (checkedCount > 0 && checkedCount < lengthPermission)
      this.masterIndeterminate = true;
    else if (checkedCount == lengthPermission) {
      this.masterIndeterminate = false;
      this.masterChecked = true;
    } else {
      this.masterIndeterminate = false;
      this.masterChecked = false;
    }
  }
  onMasterSelectChange() {

    for (let item of Object.values(this.menuPermissionList))
      for (let itemd of Object.values(item.Pemissionlist))
        itemd.Checked = this.masterChecked;
  }

  setPermission(): boolean {
    this.entity.PermissionIds = [];
      
    for (let item of Object.values(this.menuPermissionList))
      for (let itemd of Object.values(item.Pemissionlist))
        if (itemd.Checked)
          this.entity.PermissionIds.push(itemd.PermissionId);
    if (this.entity.PermissionIds.length != 0)
      return true;
    else
      return false;
  }

  submitForm(form: NgForm) {
    if (!form.valid)
      return;
    let url = "RolePanel/Create";
    if (this.isEdit)
      url = "RolePanel/Edit";

    if (!this.setPermission()) {
      this._publicService.onErorMessege("لطفا دسترسی های لازم را انتخاب نمایید ");
      return
    }

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
    if (this.permissionListSubscription != null)
      this.permissionListSubscription.unsubscribe();
    if (this.roleSubscription! != null)
      this.roleSubscription.unsubscribe();
  }


}
