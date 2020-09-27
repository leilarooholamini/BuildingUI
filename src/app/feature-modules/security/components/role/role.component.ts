import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { GridColumn, GridRequest, GridResult } from 'src/app/base-class/grid-classes';

import { EditRoleComponent } from '../edit-role/edit-role.component';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { PublicService } from 'src/app/core/services/publicService';
import { PublicShareService } from 'src/app/shared/service/public-share-service';
import { RoleDto } from '../../Dto/RoleDto';
import { Subscription } from 'rxjs/internal/Subscription';
import { WaMatConfirmDialog } from '@webacad/material-confirm-dialog';
import { NgxPermissionsService } from 'ngx-permissions';
 

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})

export class RoleComponent implements OnInit, OnDestroy {

  error: string;

  constructor(private _http: PublicShareService,
    private dialog: MatDialog,
    private _confirmDialog: WaMatConfirmDialog,
    private _ps:NgxPermissionsService ,
    private publicService: PublicService) { }

  itemsPerPage = this.publicService.itemsPerPage;

  roleSubscription: Subscription;
  currentPage: number;
  numberOfPages: number;
  enumTypeItem: any;

  query: GridRequest = { PageSize: 10, Page: 1, Sort: [], Filters: null }
  queryResult = new GridResult<RoleDto>(0, []);
  isLoading: boolean = false;
  columns: GridColumn[] = [
    new GridColumn("عنوان نقش", "RoleName", true, 'string', 300, 'contains', true),
    new GridColumn("شناسه نقش", "RoleCode", true, 'string', 300, 'contains', true),
  ];
  @ViewChild(MatPaginator,{static:true}) paginator: MatPaginator;
  enumTypeId: string;

  ngOnInit() {
  
    this.currentPage=this.paginator.pageIndex;
    this.onPopulateGrid();
  }


  onNew() {

    const dialogRef = this.dialog.open(EditRoleComponent, {
      disableClose: true,
      autoFocus: true,
      data: { EnumId: undefined, EnumTypeId: this.enumTypeId },

    });

    dialogRef.afterClosed().subscribe(
      res => {
        if (res)
          this.onPopulateGrid();
      });
  }
  onEdit(id: string) {

    const dialogRef = this.dialog.open(EditRoleComponent, {
      disableClose: true,
      autoFocus: true,
      data: { RoleId: id},

    });

    dialogRef.afterClosed().subscribe(
      res => {
        if (res)
          this.onPopulateGrid();
      });
  }

  onRemove(id: string) {
    let cd = this._confirmDialog.open(this.publicService.titleForDelete);
    cd.afterClosed().subscribe((result: boolean) => {
      if (result) {

        this._http.onDelete("RolePanel", id).subscribe(
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

  onPopulateGrid() {

    this.roleSubscription = this._http.getGridPage("RolePanel/List", this.query, null).subscribe((res: GridResult<RoleDto>) => {
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
    if (this.roleSubscription != null)
      this.roleSubscription.unsubscribe();
  }

}
