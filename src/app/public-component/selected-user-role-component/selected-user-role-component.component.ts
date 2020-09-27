import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { GridColumn, GridRequest, GridResult } from 'src/app/base-class/grid-classes';

import { AuthService } from 'src/app/core/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { NgxPermissionsService } from 'ngx-permissions';
import { PublicService } from 'src/app/core/services/publicService';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserRoleDto } from 'src/app/base-class/dto/UserRoleDto';

@Component({
  selector: 'app-selected-user-role-component',
  templateUrl: './selected-user-role-component.component.html',
  styleUrls: ['./selected-user-role-component.component.scss']
})

export class SelectedUserRoleComponent implements OnInit, OnDestroy {

  // tslint:disable-next-line: max-line-length
  constructor(private authService: AuthService, private router: Router, private publicService: PublicService, private permissionsService: NgxPermissionsService) { }
  error: string;
  // tslint:disable-next-line: member-ordering
  itemsPerPage = this.publicService.itemsPerPage;
  userRoleSubscription: Subscription;
  currentPage: number;
  numberOfPages: number;
  query: GridRequest = { PageSize: 10, Page: 1, Sort: [], Filters: null };
  queryResult = new GridResult<UserRoleDto>(0, []);
  isLoading = false;
  columns: GridColumn[] = [ 
    new GridColumn('واحد سازمانی', 'UnitName', true, 'string', 300, 'contains', true),
    new GridColumn('نقش', 'RoleTitle', true, 'string', 300, 'contains', true)
  ];

   @ViewChild(MatPaginator,{static:true}) paginator: MatPaginator;

  
  ngOnInit() {

    this.currentPage=this.paginator.pageIndex;
    this.onPopulateGrid();

  }


  onPageChange(event: any) {
    //this.query.Page = event.page;
    this.itemsPerPage=  this.query.PageSize=event.pageSize;
    this.currentPage=event.pageIndex;
   this.query.Page=event.pageIndex + 1;
    this.onPopulateGrid();
  }


  onPopulateGrid() {
    this.userRoleSubscription = this.authService.getUserRole('UserRoleSelectPanel', this.query).subscribe(res => {
      this.queryResult = res;

    });

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


 

  onSelectUserRole(userRoleId: string) {

    this.authService.getRefreshToken(userRoleId).subscribe(isLoggedIn => {
      if (!isLoggedIn) {
        this.router.navigate(['login']);
      } else {
        this.onGetPermissions();
      }

    },
      (error: HttpErrorResponse) => {
        console.error('Login error', error);
        if (error.status === 401) {
          this.error = 'Please Login Again';
        } else {
          this.error = `${error.statusText}: ${error.message}`;
        }
      });


  }
  ngOnDestroy(): void {
    this.userRoleSubscription.unsubscribe();
  }

  onGetPermissions() {
    this.authService.getUserPermission('Permissions/PermissionWithRole').subscribe((res: string[]) => {
      this.permissionsService.loadPermissions(res);
       sessionStorage.setItem('IsLog', 'true');
      this.router.navigate(['panel/dashboard']);
    });
  }
}
