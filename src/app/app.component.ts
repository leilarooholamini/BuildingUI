import { Component ,OnInit, OnDestroy } from '@angular/core';
 import { Subscription } from 'rxjs';
 
import { NgxPermissionsService } from 'ngx-permissions';
import {  NavigationCancel,
  Event,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,  
  RouterOutlet} from '@angular/router';
import { AuthService } from './core/services/auth.service';
 



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

    
export class AppComponent implements OnInit ,OnDestroy { 

  constructor(private authService: AuthService, private router:Router,
     private permissionsService: NgxPermissionsService,
    // public translate: TranslateService 
     ) {

    //   translate.addLangs(['en', 'fr']);
    // translate.setDefaultLang('en');

   // const browserLang = translate.getBrowserLang();
   // translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
    
    
  }
  subscription:Subscription;
  PermissionSubscription:Subscription;
  
  isLoggedIn: boolean;
 
  title = 'Sample Mohsen 1';
  
  ngOnInit(): void {
    
  }
 

  private navigationInterceptor(event: Event): void {
    if (event instanceof NavigationStart) {
     // this.spinnerVisibilityService.show();
    }
    if (event instanceof NavigationEnd) {
    //  this.spinnerVisibilityService.hide();
    }
    if (event instanceof NavigationCancel) {
    //  this.spinnerVisibilityService.hide();
    }
    if (event instanceof NavigationError) {
  //    this.spinnerVisibilityService.hide();
    }
  }

  ngOnDestroy(): void {
   
    this.subscription.unsubscribe();
    // this.PermissionSubscription.unsubscribe();
  }
}

