import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router, ActivatedRoute } from '../../../../node_modules/@angular/router';
import { Credentials } from '../../base-class/dto/Credentials';
import { Subscription } from '../../../../node_modules/rxjs';
import { BrowserStorageService } from '../../core/services/browser-storage.service';
import { HttpErrorResponse } from '../../../../node_modules/@angular/common/http';
import { PublicService } from '../../core/services/publicService';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.scss']
})
export class VerificationComponent implements OnInit, OnDestroy {

  isloginSubscription: Subscription;
  constructor(private authService: AuthService,
    private router: Router,
    private browserStorageService: BrowserStorageService,
    private _publicService: PublicService,
    private route: ActivatedRoute,
  ) { }
  // model: Credentials = { username: "admin", password: "123" };
  model: Credentials = { username: "", password: "",TypeAuthentication:"BE9CDA3C91944A578040A9EC1DF54C39" };
  error = "";
  phonNumber:string;
  ngOnInit(): void {
      this.phonNumber = this.browserStorageService.getSession("_P1");
    if (this.phonNumber == null) {
      this.router.navigate(["signIn"])
      return;
    }

  }

  onCodeChanged(code: string) {
  }

  onCodeCompleted(code: string) {
   
    this.model.password=code;
    this.model.username=this.phonNumber;
     let islogin = this.authService.login(this.model).subscribe(isLoggedIn => {
      if (isLoggedIn) {
        // this.animSRVC.slideToRIGHT();
 
        //  this.animSRVC.slideToRIGHT();
        this.router.navigate(["selectbuilding"]);
      }

     
    },(responseError: HttpErrorResponse) => {

       this.browserStorageService.removeAllSessions();
            this.router.navigate(["signIn"]);
      this._publicService.onErorMessege(responseError.error);
    }); 

  }
  ngOnDestroy(): void {
    if (this.isloginSubscription != null) {
      this.isloginSubscription.unsubscribe();

    }
  }
}
