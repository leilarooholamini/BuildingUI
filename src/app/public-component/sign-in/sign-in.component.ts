import { Component, OnInit, OnDestroy } from '@angular/core';
import { PublicService } from '../../core/services/publicService';
import { PublicShareService } from '../../shared/service/public-share-service';
import { Subscription } from '../../../../node_modules/rxjs';
import { SendSMSDTO } from '../../base-class/dto/Credentials';
import { NgForm } from '../../../../node_modules/@angular/forms';
import { HttpErrorResponse } from '../../../../node_modules/@angular/common/http';
import { Router } from '../../../../node_modules/@angular/router';
import { BrowserStorageService } from '../../core/services/browser-storage.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'], 
  animations: [
  
  ]
})
export class SignInComponent implements OnInit, OnDestroy  {
  errors: string[]=[];
  
  constructor(
    private _http: PublicShareService,
    private _publicService: PublicService,
    private router: Router, 
    private browserStorageService:BrowserStorageService
  ) { }
  sendVrifyCodeSubscription: Subscription;
entity :SendSMSDTO={Mobile:''}

  ngOnInit(): void {
  }
  animationState=false;
  animate() {
    this.animationState = !this.animationState;
  }

  submitForm(form: NgForm) {
    if (!form.valid)
      return;
    let url = "SendSMSPanel/SendVerification";
   

    this.errors = [];
    this.sendVrifyCodeSubscription = this._http.Save(url, this.entity, false).subscribe(
      (res: any) => {
        this._publicService.onSuccessMessege(res);
        this.browserStorageService.setSession("_P1" , this.entity.Mobile);
        this.router.navigate(["verification"])
      },
      (responseError: HttpErrorResponse) => {
        this.errors = this._publicService.processModelStateErrors(form, responseError);
      });
  }


  ngOnDestroy(): void {
    if(this.sendVrifyCodeSubscription !=null)
    this.sendVrifyCodeSubscription.unsubscribe()
  }
}
