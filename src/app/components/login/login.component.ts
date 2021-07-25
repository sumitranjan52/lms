import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AppglobalService } from "src/app/services/appglobal.service";
import { AuthService } from "src/app/services/auth.service";
import { AppConfig } from "src/config/config";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  appConfig = AppConfig;

  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private gbl: AppglobalService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: [""],
      password: [""],
    });
  }

  errorMsg;
  disabled = false;

  login(form) {
    this.disabled = true;
    console.log(form.value);
    this.auth.login(form.value).subscribe(
      (resp: any) => {
        this.disabled = false;
        if (resp) {
          sessionStorage.setItem("lms-token", resp.lmsmsg);
          this.gbl.token = resp.lmsmsg;
          this.gbl.decodedUser = resp.lmsmsg;
          let url = this.gbl.redirectUrl ? this.gbl.redirectUrl : "/dashboard";
          this.router.navigate([url], { relativeTo: this.route });
        }
      },
      (err: HttpErrorResponse) => {
        this.disabled = false;
        console.log(err);
        if (err.status === 401 || err.status === 400 || err.status === 500) {
          console.log(err.error.errorMsg);
          this.errorMsg = err.error.lmsmsg;
          this.loginForm.get("password").setValue("");
        }
      }
    );
  }
}
