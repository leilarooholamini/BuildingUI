import { ChangePasswordUserComponent } from './components/change-password-user/change-password-user.component';
import { CommonModule } from '@angular/common';
import { EditRoleComponent } from './components/edit-role/edit-role.component';
import { EditUserComponent } from './components/edite-user/edite-user.component';
import { NgModule } from '@angular/core';
import { RoleComponent } from './components/role/role.component';
import { SecurityRoutingModule } from './security-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserComponent } from './components/user/user.component';
import { EditUserRoleComponent } from './components/edit-user-role/edit-user-role.component';
import { UserRoleComponent } from './components/user-role/user-role.component';

@NgModule({
  declarations: [UserComponent, EditUserComponent, RoleComponent, EditRoleComponent, ChangePasswordUserComponent, EditUserRoleComponent, UserRoleComponent, ],
  entryComponents: [
    
    EditUserComponent,
    EditRoleComponent,
    UserRoleComponent,
    EditUserRoleComponent,
    ChangePasswordUserComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    SecurityRoutingModule,

  ]
})
export class SecurityModule { }
