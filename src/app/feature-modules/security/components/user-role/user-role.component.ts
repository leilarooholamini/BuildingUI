import { Component, OnInit, ViewChild, OnDestroy, Inject } from '@angular/core';
import { EditUserRoleComponent } from '../edit-user-role/edit-user-role.component';
import { GridColumn, GridRequest, GridResult } from 'src/app/base-class/grid-classes';
import { Subscription } from 'rxjs';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { PublicService } from 'src/app/core/services/publicService';
import { WaMatConfirmDialog } from '@webacad/material-confirm-dialog';
import { PublicShareService } from 'src/app/shared/service/public-share-service';
import { UserRoleDto } from 'src/app/base-class/dto/UserRoleDto';

@Component({
  selector: 'app-user-role',
  templateUrl: './user-role.component.html',
  styleUrls: ['./user-role.component.scss']
})
export class UserRoleComponent implements OnInit, OnDestroy {
  error: string;

  constructor(private _http: PublicShareService ,
    private _dialogRef: MatDialogRef<UserRoleComponent>,
    private dialog: MatDialog,
    private _confirmDialog: WaMatConfirmDialog ,
    private publicService: PublicService,
    @Inject(MAT_DIALOG_DATA) private data)  { }


  itemsPerPage = this.publicService.itemsPerPage;
  currentPage: number;
  numberOfPages: number;
   @ViewChild(MatPaginator,{static:true}) paginator: MatPaginator;
  userRoleSubscription: Subscription;

  query: GridRequest = { PageSize: 10, Page: 1, Sort: [], Filters: null }
  queryResult = new GridResult< UserRoleDto>(0, []);
  isLoading: boolean = false;



  columns: GridColumn[] = [ 
                  new GridColumn("عنوان نقش", "RoleTitle", true, 'string', 150, 'contains', false), 
                  new GridColumn("عنوان سازمان", "UnitName", true, 'string', 150, 'contains', false), 
    
  ];
 

  ngOnInit() {
     this.currentPage=this.paginator.pageIndex;
 
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.onPopulateGrid();
    })
  }



  onCancel() {
    this._dialogRef.close(false);
  }


  onNew() {

    const dialogRef = this.dialog.open(EditUserRoleComponent, {
      disableClose: true,
      width:'700px',
      autoFocus: true,
      data: { UserId: this.data.UserId },

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

        this._http.onDelete("UserRolePanel", id).subscribe(
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

    this.userRoleSubscription = this._http.getGridPage("UserRolePanel/GridList", this.query,"&userId="+this.data.UserId).subscribe((res: GridResult<UserRoleDto>) => {
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
  
    if (this.userRoleSubscription != null)
      this.userRoleSubscription.unsubscribe();
  }
}
