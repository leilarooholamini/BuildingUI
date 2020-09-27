import { NgModule, ErrorHandler, SkipSelf, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { APP_CONFIG, AppConfig } from './services/IAppConfig';
import { BrowserStorageService } from './services/browser-storage.service';
import { HTTP_INTERCEPTORS, HttpClientModule, HttpClient } from '@angular/common/http';
import { SpinnerLoadingInterceptor, AuhInterceptor, ErrorInterceptor } from './interceptors/Auth.interceptor';
import { AppErrorHandler } from './interceptors/app.error-handler';
import { RouterModule } from '@angular/router';


@NgModule({
  imports: [
    CommonModule, 
    RouterModule,
    HttpClientModule,

     
  ],
  exports: [
    HttpClientModule,
    
    // components that are used in app.component.ts will be listed here.
  ],
  declarations: [
   
     
  ],
  providers: [
    { provide: APP_CONFIG, useValue: AppConfig },
    BrowserStorageService, 
    {  provide: HTTP_INTERCEPTORS, useClass: SpinnerLoadingInterceptor, multi: true},
    { provide: HTTP_INTERCEPTORS, useClass: AuhInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: ErrorHandler, useClass: AppErrorHandler },
   
  ]
})
export class CoreModule {
  constructor( @Optional() @SkipSelf() core: CoreModule) {
    if (core) {
      throw new Error("CoreModule should be imported ONLY in AppModule.");
    }
  }
}