import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxPermissionsService } from 'ngx-permissions';
import { UserInfoDto } from 'src/app/base-class/dto/UserRoleDto';
import { AuthService } from 'src/app/core/services/auth.service';
import { PublicShareService } from 'src/app/shared/service/public-share-service';

@Component({
  selector: 'app-only-toolbar-panel',
  templateUrl: './only-toolbar-panel.component.html',
  styleUrls: ['./only-toolbar-panel.component.scss']
})
export class OnlyToolbarPanelComponent implements OnInit {

  constructor(  private _http: PublicShareService,
    private authService: AuthService,
    private router: Router,
    private permissionsService: NgxPermissionsService,) { }
  entity: UserInfoDto = { FullName: '',   ImagePath: '', RoleName: '', UnitName: '', UserId: '' };

  serverUrl:string
  ngOnInit(): void {

    this.serverUrl = this._http.urlImagePath;
    this.getUserInfo();
  }

  getUserInfo(){
    this._http.getAll("MyAccount/GetMyAccountInfo").subscribe((res: UserInfoDto) => {
      this.entity = res; 
    });
  }

  
  onlogOut() {
    this.authService.logout(true).subscribe((res) => {

      this.permissionsService.flushPermissions();
      this.router.navigate(['']);


    })

  }

}
