import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { GridColumn, GridRequest, GridResult } from 'src/app/base-class/grid-classes';

import { EditEnumComponent } from 'src/app/feature-modules/base-information/components/edit-enum/edit-enum.component';
import { EnumDto } from 'src/app/feature-modules/base-information/Dto/EnumDto';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { PublicService } from 'src/app/core/services/publicService';
import { PublicShareService } from 'src/app/shared/service/public-share-service';
import { Subscription } from 'rxjs/internal/Subscription';
import { WaMatConfirmDialog } from '@webacad/material-confirm-dialog';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-enum',
  templateUrl: './enum.component.html',
  styleUrls: ['./enum.component.scss']
})

export class EnumComponent implements OnInit, OnDestroy {
  error: string;

  constructor(private _http: PublicShareService,
    private dialog: MatDialog,
    private _confirmDialog: WaMatConfirmDialog,
    private publicService: PublicService,
    private _route: ActivatedRoute,
    private router: Router, ) { }


    itemsPerPage = this.publicService.itemsPerPage;
  enumTypeItemSubscription: Subscription;
  enumTypeSubscription: Subscription;
  currentPage: number;
  numberOfPages: number;

  menuCode: string;
  Insertpermision: string;
  Updatepermision: string;
  Deletepermision: string;
  query: GridRequest = { PageSize: 10, Page: 1, Sort: [], Filters: null }
  queryResult = new GridResult<EnumDto>(0, []);
  isLoading: boolean = false;
  columns: GridColumn[] = [
    new GridColumn("عنوان", "EnumName", true, 'string', 300, 'contains', true),
    new GridColumn("شناسه ", "EnumCode", true, 'string', 300, 'contains', true),
    new GridColumn(" نوع اطلاعات پایه", "EnumTypeTitel", true, 'string', 300, 'contains', true),
    new GridColumn("عنوان مافوق ", "ParentName", true, 'string', 300, 'contains', true)

  ];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
 

  ngOnInit() {
    this.currentPage=this.paginator.pageIndex;
 //   if (this._route.snapshot.paramMap.get('menuCode') != "") {
     

this._route.params.subscribe((param:Params)=>{

  if(param['menuCode']!=null)
  {this.menuCode = param['menuCode'];
  this._http.getAll("Permissions/GetPermissionWithFixedData?menuCode=" + this.menuCode).subscribe((res: string[]) => {
 
    this.Insertpermision = res.filter(c => c.endsWith("Insert"))[0];
    this.Updatepermision = res.filter(c => c.endsWith("Update"))[0];
    this.Deletepermision = res.filter(c => c.endsWith("Delete"))[0];
  })

  this.onPopulateGrid();
}
else this.router.navigate(["/panel/dashboard"])

})

  
  }


  onNew() {

    const dialogRef = this.dialog.open(EditEnumComponent, {
      disableClose: true,
      autoFocus: true,
      data: { EnumId: undefined, EnumTypeCode: this.menuCode },

    });

    dialogRef.afterClosed().subscribe(
      res => {
        if (res)
          this.onPopulateGrid();
      });

  }
  onEdit(id: string) {

    const dialogRef = this.dialog.open(EditEnumComponent, {
      disableClose: true,
      autoFocus: true,
      data: { EnumId: id, EnumTypeCode: this.menuCode },

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

        this._http.onDelete("EnumPanel", id).subscribe(
          (res: any) => {
            this.onPopulateGrid();
            this.publicService.onSuccessMessege(res);
          });

      }
    });



  }

  onPageChange(event: any) {
    this.itemsPerPage=  this.query.PageSize=this.paginator.pageSize;
    this.currentPage=this.paginator.pageIndex;
   this.query.Page=this.paginator.pageIndex + 1;
    this.onPopulateGrid();
  }

  OnRefreshGrid(event: Event) {
    this.onPopulateGrid();
  }
  onPopulateGrid() {
 
    this.enumTypeItemSubscription = this._http.getGridPage("EnumPanel", this.query, "EnumTypeCode=" + this.menuCode ).subscribe((res: GridResult<EnumDto>) => {
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

    if (this.enumTypeItemSubscription != null)
      this.enumTypeItemSubscription.unsubscribe();
  }
}
