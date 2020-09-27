import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/core/services/auth.service';
import { Credentials } from 'src/app/base-class/dto/Credentials';
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  constructor( private authService: AuthService,
     private router:Router,
     private route: ActivatedRoute,
  ) { }
 // model: Credentials = { username: "admin", password: "123" };
 model: Credentials = { username: "", password: "" ,TypeAuthentication:"BD3C1182164F452DBDDE3FC94F0DCF14" };
  error = "";
  returnUrl: string;
  ngOnInit() {
  this.authService.onRemoveToken();
    this.authService.logout(false);
    this.returnUrl = this.route.snapshot.queryParams["returnUrl"];
  }

  submitForm(form: NgForm) {
   if(!form.valid)
  {
    this.error = "لطفا  فیلدها را کامل نمایید";
    return;
  }

    let islogin=  this.authService.login(this.model).subscribe(isLoggedIn => {
      if (isLoggedIn) {
        if (this.returnUrl) {
         // this.animSRVC.slideToRIGHT();
          this.router.navigate([this.returnUrl]);
        } else {
        //  this.animSRVC.slideToRIGHT();
          this.router.navigate(["selectrole"]);
        }
      }
    }
     

    );



  }

}
