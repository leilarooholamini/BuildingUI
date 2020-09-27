import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { GridColumn, GridRequest, GridResult } from 'src/app/base-class/grid-classes';

import { ChangePasswordUserComponent } from 'src/app/feature-modules/security/components/change-password-user/change-password-user.component';
import { EditUserComponent } from 'src/app/feature-modules/security/components/edite-user/edite-user.component';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { PublicService } from 'src/app/core/services/publicService';
import { PublicShareService } from 'src/app/shared/service/public-share-service';
import { Subscription } from 'rxjs/internal/Subscription';
import { UserDto } from 'src/app/feature-modules/security/Dto/UserDto';
import { WaMatConfirmDialog } from '@webacad/material-confirm-dialog';
import { UserRoleComponent } from '../user-role/user-role.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})

export class UserComponent implements OnInit, OnDestroy {
  error: string;
imageUrl:string;
  constructor(private _http: PublicShareService,
    private dialog: MatDialog,
    private _confirmDialog: WaMatConfirmDialog,
    private publicService: PublicService) { }


  itemsPerPage = this.publicService.itemsPerPage;
  currentPage: number;
  numberOfPages: number;

  userSubscription: Subscription;
  @ViewChild(MatPaginator,{static:true}) paginator: MatPaginator;
  query: GridRequest = { PageSize: 10, Page: 1, Sort: [], Filters: null }
  queryResult = new GridResult< UserDto>(0, []);
  isLoading: boolean = false;

  columns: GridColumn[] = [
            new GridColumn("نام", "PersonalName", true, 'string', 150, 'contains', true),
            new GridColumn("نام خانوادگی", "PersonalLastName", true, 'string', 150, 'contains', true),
            new GridColumn("شناسه پرسنلی", "PersonalCode", true, 'string', 150, 'contains', true),
            new GridColumn("نام پدر", "Father", true, 'string', 150, 'contains', true),
            new GridColumn("نام کاربری", "UserName", true, 'string', 150, 'contains', true),
            new GridColumn("رایانامه", "EmailAddress", true, 'string', 150, 'contains', true),
            new GridColumn("تاریخ تولد", "BirthDate", true, 'string', 150, 'contains', true),
    

            new GridColumn("وضعیت", "IsActive", true, 'bool', 150, 'eq', true),
            new GridColumn("وضعیت قفل", "Lock", true, 'bool', 150, 'eq', true) ,
            new GridColumn("تصویر", "ImagePath",false, 'string', 150, 'contains', false),
  ];


  ngOnInit() {
    this.imageUrl=this._http.urlImagePath;
    this.currentPage=this.paginator.pageIndex;
     this.onPopulateGrid();
  }


  onNew() {

    const dialogRef = this.dialog.open(EditUserComponent, {
      disableClose: true,
      autoFocus: true,
      data: { UserId: undefined },

    });

    dialogRef.afterClosed().subscribe(
      res => {
        if (res)
          this.onPopulateGrid();
      });

  }



  onUserRole(id: string){


    const dialogRef = this.dialog.open(UserRoleComponent, {
      disableClose: true,
      autoFocus: true,
      data: { UserId: id },

    }); 

  }

  
  onEdit(id: string) {

    const dialogRef = this.dialog.open(EditUserComponent, {
      disableClose: true,
      autoFocus: true,
      data: { UserId: id },

    });

    dialogRef.afterClosed().subscribe(
      res => {
        if (res)
          this.onPopulateGrid();
      });
  }


  onChengeUserPassword(id: string) {

    const dialogRef = this.dialog.open(ChangePasswordUserComponent, {
      disableClose: true,
      autoFocus: true,
      data: { UserId: id },

    });

  }


  onRemove(id: string) {
    let cd = this._confirmDialog.open(this.publicService.titleForDelete);
    cd.afterClosed().subscribe((result: boolean) => {
      if (result) {

        this._http.onDelete("UserPanel", id).subscribe(
          (res: any) => {
            this.onPopulateGrid();
            this.publicService.onSuccessMessege(res);
          });

      }
    });
  }

  onPageChange(event: any) {
    this.itemsPerPage=  this.query.PageSize=event.pageSize;
    this.currentPage=event.pageIndex;
   this.query.Page=event.pageIndex + 1;
    this.onPopulateGrid();
  }

  OnRefreshGrid(event: Event) {
    this.onPopulateGrid();
  }
  onPopulateGrid() {

    this.userSubscription = this._http.getGridPage("UserPanel/List", this.query,null).subscribe((res: GridResult<UserDto>) => {
      this.queryResult = res;
    })
  }

  onGridSort(columnName: string) {

    this.query = this.publicService.onGridSort(this.query, columnName);
    this.onPopulateGrid();

  }
  onGridFilter(filterObj:any) {
      
    let res = this.publicService.onGridFilter(this.query, this.columns, filterObj.filterColumn, filterObj.input,filterObj.Operator);
    this.query = res.gridRequest;
    if (res.isRefreshGird)
      this.onPopulateGrid();


  }

  ngOnDestroy(): void {

    if (this.userSubscription != null)
      this.userSubscription.unsubscribe();
  }
}
