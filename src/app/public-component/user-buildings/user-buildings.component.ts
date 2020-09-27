import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { NgxPermissionsService } from 'ngx-permissions';
import { Subscription } from 'rxjs';
import { UserRoleDto } from 'src/app/base-class/dto/UserRoleDto';
import { GridRequest, GridResult } from 'src/app/base-class/grid-classes';
import { AuthService } from 'src/app/core/services/auth.service';
import { PublicService } from 'src/app/core/services/publicService';
import { PublicShareService } from 'src/app/shared/service/public-share-service';

@Component({
  selector: 'app-user-buildings',
  templateUrl: './user-buildings.component.html',
  styleUrls: ['./user-buildings.component.scss']
})
export class UserBuildingsComponent implements OnInit {

  constructor(private authService: AuthService,
    private _http: PublicShareService,
     private router: Router, 
     private publicService: PublicService, 
     private permissionsService: NgxPermissionsService) { }
  error: string;
 
  userRoleSubscription: Subscription;
  queryResult :Array<UserRoleDto>;

 
  ngOnInit(): void {
  
    this.onPopulateGrid();
  }

  gridColumns = 5;

  toggleGridColumns() {
    this.gridColumns = this.gridColumns === 3 ? 4 : 3;
  }
 
  onPopulateGrid() {
    this.userRoleSubscription = this._http.getAll('UserRoleSelectPanel').subscribe(res => {
      this.queryResult = res;

    });

  } 

  onSelectUserRole(userRoleId:string) {

    this.authService.getRefreshToken(userRoleId).subscribe(isLoggedIn => {
      if (!isLoggedIn) {
        this.router.navigate(['login']);
      } else {
        this.onGetPermissions();
      }

    },
      (error: HttpErrorResponse) => {
      
        if (error.status === 401) {
        //  this.error = 'Please Login Again';
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
