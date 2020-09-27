import { APP_INITIALIZER, NgModule } from '@angular/core';
import { NgxPermissionsModule, NgxPermissionsService } from 'ngx-permissions';

import { AccessDeniedComponent } from './public-component/access-denied/access-denied.component';
import { AdminLayoutComponent } from './public-component/admin-layout/admin-layout.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CoreModule } from './core/core.module';
import { LayoutLoginComponent } from './public-component/layout-login/layout-login.component';
import { LoginComponent } from './public-component/login/login.component';
import { PageNotFoundComponent } from './public-component/page-not-found/page-not-found.component';
import { PublicShareService } from './shared/service/public-share-service';
import { SelectedUserRoleComponent } from './public-component/selected-user-role-component/selected-user-role-component.component';
import { SharedModule } from './shared/shared.module';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { EditUserProfileComponent } from './public-component/edit-user-profile/edit-user-profile.component';
import { SignInComponent } from './public-component/sign-in/sign-in.component';
import { VerificationComponent } from './public-component/verification/verification.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { FlexLayoutModule } from '@angular/flex-layout';
import { UserBuildingsComponent } from './public-component/user-buildings/user-buildings.component';
import { OnlyToolbarPanelComponent } from './public-component/only-toolbar-panel/only-toolbar-panel.component';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}




@NgModule({
  entryComponents: [EditUserProfileComponent],
  declarations: [
    AppComponent,
    AccessDeniedComponent,
    LayoutLoginComponent,
    PageNotFoundComponent,
    AdminLayoutComponent,
    LoginComponent,
    EditUserProfileComponent,
    SelectedUserRoleComponent,
    SignInComponent,
    VerificationComponent,
    UserBuildingsComponent,
    OnlyToolbarPanelComponent,

  ],
  imports: [
    FlexLayoutModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule,
    SharedModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },

    }),


    // FormlyModule.forRoot(),
    // FormlyMaterialModule,
    NgxPermissionsModule.forRoot(),


    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),

  ],
  providers: [

    {
      provide: APP_INITIALIZER,
      useFactory: (ds: PublicShareService, ps: NgxPermissionsService) => function () {
        return ds.getUserPermissionPromiss("Permissions/PermissionWithRole").then((data) => {
          if (data)
            return ps.loadPermissions(data)
        })
      },
      deps: [PublicShareService, NgxPermissionsService],
      multi: true
    },
    // {  provide: HTTP_INTERCEPTORS, useClass: SpinnerLoadingInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
