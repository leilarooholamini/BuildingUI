import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';
import { RoleComponent } from './components/role/role.component';
import { UserComponent } from './components/user/user.component';

const routes: Routes = [
  {path:"role", component:RoleComponent},
  { path: '', redirectTo: 'role', pathMatch: 'full' },
  { path: 'user', component:UserComponent }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecurityRoutingModule { }
