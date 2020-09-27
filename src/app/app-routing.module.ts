import { RouterModule, Routes } from '@angular/router';

import { AccessDeniedComponent } from './public-component/access-denied/access-denied.component';
import { AdminLayoutComponent } from './public-component/admin-layout/admin-layout.component';
import { LayoutLoginComponent } from './public-component/layout-login/layout-login.component';
import { LoginComponent } from './public-component/login/login.component';
import { NgModule } from '@angular/core';
import { PageNotFoundComponent } from './public-component/page-not-found/page-not-found.component';
import { SelectedUserRoleComponent } from './public-component/selected-user-role-component/selected-user-role-component.component';
import { SignInComponent } from './public-component/sign-in/sign-in.component';
import { VerificationComponent } from './public-component/verification/verification.component';
import { UserBuildingsComponent } from './public-component/user-buildings/user-buildings.component';
import { OnlyToolbarPanelComponent } from './public-component/only-toolbar-panel/only-toolbar-panel.component';

const routes: Routes = [
  {
    path: '', component: LayoutLoginComponent, children: [
      { path: '', component: SignInComponent },
      { path: "signIn", component: SignInComponent },
      { path: 'verification', component: VerificationComponent },
  
    ]
  },
  {path:'' ,component:OnlyToolbarPanelComponent,children:[
    { path: 'selectbuilding', component: UserBuildingsComponent },
   
  ]},
  {
    path: "panel", component: AdminLayoutComponent,
    children: [
      { path: 'dashboard', loadChildren: () => import('./feature-modules/dashboard/dashboard.module').then(m => m.DashboardModule) },
      { path: 'security', loadChildren: () => import('./feature-modules/security/security.module').then(m => m.SecurityModule) },
      { path: 'baseInfo', loadChildren: () => import('./feature-modules/base-information/base-information.module').then(m => m.BaseInformationModule) },

    ]
  },

  { path: '403', component: AccessDeniedComponent },
  { path: '**', component: PageNotFoundComponent }

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
