import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { GridResult, GridColumn, GridRequest } from 'src/app/base-class/grid-classes';
import { EditUnitComponent } from 'src/app/feature-modules/base-information/components/edit-unit/edit-unit.component';
import { UnitDTO } from 'src/app/feature-modules/base-information/Dto/UnitDto';
import { Subscription } from 'rxjs/internal/Subscription';
import { PublicService } from 'src/app/core/services/publicService';
import { WaMatConfirmDialog } from '@webacad/material-confirm-dialog';
import { MatDialog } from '@angular/material/dialog';
import { PublicShareService } from 'src/app/shared/service/public-share-service';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-unit',
  templateUrl: './unit.component.html',
  styleUrls: ['./unit.component.scss']
})
export class UnitComponent implements OnInit, OnDestroy {
  error: string;

  constructor(private _http: PublicShareService,
    private dialog: MatDialog,
    private _confirmDialog: WaMatConfirmDialog,
    private publicService: PublicService) { }


  itemsPerPage = this.publicService.itemsPerPage;

  userUnitSubscription: Subscription;
  currentPage: number;
  numberOfPages: number;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  query: GridRequest = { PageSize: 10, Page: 1, Sort: [], Filters: null }
  queryResult = new GridResult<UnitDTO>(0, []);
  isLoading: boolean = false;


  columns: GridColumn[] = [
    new GridColumn("عنوان سازمان", "UnitName", true, 'string', 150, 'contains', true),
    new GridColumn("عنوان سازمان مافوق", "ParentTitle", true, 'string', 150, 'contains', true),
    new GridColumn("نوع سازمان", "UnitTypeTitle", true, 'string', 120, 'contains', true),
    new GridColumn("شماره تلفن", "Phone", true, 'string', 100, 'contains', true),
    new GridColumn("آدرس", "Address", true, 'string', 160, 'contains', true),
    new GridColumn("وضعیت", "IsActive", true, 'bool', 100, 'eq', true)

  ];

  enumTypeId: string;

  ngOnInit() {
    this.currentPage = this.paginator.pageIndex;
    this.onPopulateGrid();
  }


  onNew() {

    const dialogRef = this.dialog.open(EditUnitComponent, {
      disableClose: true,
      width: '700px',
      autoFocus: true,
      data: { UnitId: undefined },

    });

    dialogRef.afterClosed().subscribe(
      res => {
        if (res)
          this.onPopulateGrid();
      });

  }
  onEdit(id: string) {

    const dialogRef = this.dialog.open(EditUnitComponent, {
      disableClose: true,
      width: '700px',
      autoFocus: true,
      data: { UnitId: id },

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

        this._http.onDelete("UnitPanel", id).subscribe(
          (res: any) => {
            this.onPopulateGrid();
            this.publicService.onSuccessMessege(res);
          });

      }
    });
  }

  onPageChange(event: any) {
    this.itemsPerPage = this.query.PageSize = this.paginator.pageSize;
    this.currentPage = this.paginator.pageIndex;
    this.query.Page = this.paginator.pageIndex + 1;
    this.onPopulateGrid();
  }

  OnRefreshGrid(event: Event) {
    this.onPopulateGrid();
  }
  onPopulateGrid() {

    this.userUnitSubscription = this._http.getGridPage("UnitPanel/List", this.query, null).subscribe((res: GridResult<UnitDTO>) => {
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

    if (this.userUnitSubscription != null)
      this.userUnitSubscription.unsubscribe();
  }
}