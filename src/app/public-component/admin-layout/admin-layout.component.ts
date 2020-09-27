import { Component, OnInit, Inject } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

import { PublicService } from 'src/app/core/services/publicService';
import { PublicShareService } from 'src/app/shared/service/public-share-service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { NgxPermissionsService } from 'ngx-permissions';
import { UserInfoDto } from 'src/app/base-class/dto/UserRoleDto';
import { APP_CONFIG, IAppConfig } from 'src/app/core/services/IAppConfig';
import { throwMatDialogContentAlreadyAttachedError, MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { EditUserProfileComponent } from '../edit-user-profile/edit-user-profile.component';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss'], animations: [
    trigger('indicatorRotate', [
      state('collapsed', style({ transform: 'rotate(0deg)' })),
      state('expanded', style({ transform: 'rotate(180deg)' })),
      transition('expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4,0.0,0.2,1)')
      ),
    ])
  ]
})

export class AdminLayoutComponent implements OnInit {
 

  constructor(private router: Router,
    private _http: PublicShareService,
    private authService: AuthService,
    @Inject(APP_CONFIG) private appConfig: IAppConfig,
    private permissionsService: NgxPermissionsService,
    private dialog: MatDialog,
    private publicservice: PublicService, public translate: TranslateService
  ) {

  }

  navItems: NavItem[] = [];
  serverUrl: string;
  lang: string;
  entity: UserInfoDto = { FullName: '',   ImagePath: '', RoleName: '', UnitName: '', UserId: '' };

  ngOnInit() {

    this.serverUrl = this.appConfig.imageSrc;
    this._http.getAll("Permissions/AccessMenu").subscribe((res: any[]) => {

      const cloned = res.map(x => Object.assign([], x));
      this.navItems = this._getPreparedData(cloned)

    });
    
    this.getUserInfo();
  }

  dir = 'rtl';

  mode = new FormControl('side'); 
  toggleDir(): void {
    this.dir = 'ltr'  
    document.dir = this.dir;
  }


  getUserInfo(){

    this._http.getAll("MyAccount/GetAccountInfo").subscribe((res: UserInfoDto) => {
      this.entity = res;
      this.publicservice.currentUserId = res.UserId;
 
        this.translate.setDefaultLang('fa');
        this.lang = this.translate.getDefaultLang();
      

    });

  }

  onChangeLang(value: string) {

    this.lang = value;
    this.translate.use(value);
  }



  onShowProfile() {

    const dialogRef =  this.dialog.open(EditUserProfileComponent, {
      disableClose: true,
      autoFocus: true,
    });
    dialogRef.afterClosed().subscribe(
      res => {
        if (res)
        this.getUserInfo();
      });
  }


  onlogOut() {
    this.authService.logout(true).subscribe((res) => {

      this.permissionsService.flushPermissions();
      this.router.navigate(['']);


    })

  }
  private onloaddata() {




  }



  private _recursiveEdit(list, childrenAttr, attr, value) {

    if (Array.isArray(list)) {
      for (let i = 0, len = list.length; i < len; i++) {
        list[i][attr] = value;
        if (list[i][childrenAttr].length) {
          this._recursiveEdit(list[i][childrenAttr], childrenAttr, attr, value);
        }
      }
    }
  }

  private _getPreparedData(list) {

    let tree = [], lookup = {};
    for (let i = 0, len = list.length; i < len; i++) {
      lookup[list[i]["MenuId"]] = list[i];
      list[i]["children"] = [];
      // list[i][this.collapseAttr] = true;
      // list[i][this.selectAttr] = false;
      // list[i][this.inDeterminateAttr] = false;
    }
    for (let i = 0, len = list.length; i < len; i++) {
      if (list[i]["ParentId"]) {
        lookup[list[i]["ParentId"]]["children"].push(list[i]);
      } else {
        tree.push(list[i]);
      }
    }
    return tree;
  };

  ngAfterViewInit() {

  }

  public logout() {

    this.router.navigate(['login'], { replaceUrl: true });
  }

}
export interface NavItem {
  Title: string;
  disabled?: boolean;
  iconName: string;
  Url?: string;
  children?: NavItem[];
}
