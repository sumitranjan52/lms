import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { AppglobalService } from "src/app/services/appglobal.service";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-change-pass",
  templateUrl: "./change-pass.component.html",
  styleUrls: ["./change-pass.component.css"],
})
export class ChangePassComponent implements OnInit {
  changePasswordForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private gbl: AppglobalService
  ) {}

  ngOnInit() {
    this.changePasswordForm = this.fb.group({
      oldPassword: ["", Validators.required],
      password: ["", Validators.required],
      confPassword: ["", Validators.required],
    });
  }

  error = null;

  get password() {
    return this.changePasswordForm.get("password") as FormControl;
  }

  get oldPassword() {
    return this.changePasswordForm.get("oldPassword") as FormControl;
  }

  get confPassword() {
    return this.changePasswordForm.get("confPassword") as FormControl;
  }

  changePassword(value) {
    console.log(value);
    if (value.confPassword != value.password) {
      this.error = "New Password and Confirm New Password doesn't matches";
      return;
    }
    this.error = null;
    delete value.confPassword;
    this.auth.changePassword(value).subscribe(
      (resp: any) => {
        this.gbl.openDialog("success", resp.lmsmsg);
        this.password.setValue("");
        this.password.setErrors(null);
        this.oldPassword.setValue("");
        this.oldPassword.setErrors(null);
        this.confPassword.setValue("");
        this.confPassword.setErrors(null);
      },
      (err: HttpErrorResponse) => {
        console.log(err);
        if (err.status === 401 || err.status === 400 || err.status === 500) {
          console.log(err.error.lmsmsg);
          this.gbl.openDialog("error", err.error.lmsmsg);
          this.changePasswordForm.get("password").setValue("");
          this.changePasswordForm.get("oldPassword").setValue("");
          this.changePasswordForm.get("confPassword").setValue("");
        }
      }
    );
  }
}
