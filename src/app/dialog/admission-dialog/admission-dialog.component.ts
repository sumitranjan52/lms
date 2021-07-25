import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { FormTypeService } from "src/app/services/form-type.service";
import { StdService } from "src/app/services/std.service";

@Component({
  selector: "app-admission-dialog",
  templateUrl: "./admission-dialog.component.html",
  styleUrls: ["./admission-dialog.component.css"],
})
export class AdmissionDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<AdmissionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private std: StdService,
    private fType: FormTypeService
  ) {}

  newAdmissionForm: FormGroup;

  months = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "JUNE",
    "JULY",
    "AUG",
    "SEP",
    "OCT",
    "DEC",
  ];

  years = [];
  stds = [];
  formTypes = [];

  ngOnInit() {
    const year = new Date().getFullYear();
    this.years.push(year);
    for (let i = 1; i <= 10; i++) {
      this.years.push(year + i);
    }
    this.newAdmissionForm = this.fb.group({
      sessionMonth: ["", Validators.required],
      sessionYear: ["", Validators.required],
      className: ["", Validators.required],
      formType: ["", Validators.required],
      dob: ["", Validators.required],
    });

    if (this.data && this.data.readmit && this.data.dob) {
      this.dob.setValue(this.data.dob);
    }

    this.std.doGetAll().subscribe((resp: any) => {
      console.log(resp);
      this.stds = resp;
    });

    this.fType.doGetAll().subscribe((resp: any) => {
      console.log(resp);
      this.formTypes = resp;
    });
  }

  age: string;
  maxDate = new Date();

  calcAge(dobLocal: Date) {
    if (this.className.value) {
      let diff = Date.now() - dobLocal.getTime();
      let ageDate = new Date(diff);
      let year = ageDate.getUTCFullYear();
      let numberAge = Math.abs(year - 1970);
      this.age = numberAge.toString();

      if (this.className.value.id === "X" && numberAge < 14) {
        this.dob.setErrors({ msg: "Age is less than 14" });
      }
      if (this.className.value.id === "XII" && numberAge < 15) {
        this.dob.setErrors({ msg: "Age is less than 15" });
      }
    } else {
      this.dob.setErrors({ msg: "Class is required" });
    }
  }

  getErrorMessage(controlName, fieldName) {
    const ctrl = this.newAdmissionForm.get(controlName);
    if (ctrl.errors.required) {
      return fieldName + " is mandatory.";
    } else if (ctrl.errors.minlength) {
      return (
        fieldName +
        " should have atleast " +
        ctrl.errors.minlength.requiredLength +
        " characters"
      );
    } else if (ctrl.errors.maxlength) {
      return (
        fieldName +
        " cann't exceed " +
        ctrl.errors.maxlength.requiredLength +
        " characters"
      );
    } else if (ctrl.errors.pattern) {
      return fieldName + " is not valid based on pattern";
    } else if (ctrl.errors.msg) {
      return ctrl.errors.msg;
    }
  }

  get sessionMonth() {
    return this.newAdmissionForm.get("sessionMonth");
  }

  get sessionYear() {
    return this.newAdmissionForm.get("sessionYear");
  }

  get className() {
    return this.newAdmissionForm.get("className");
  }

  get formType() {
    return this.newAdmissionForm.get("formType");
  }

  get dob() {
    return this.newAdmissionForm.get("dob");
  }

  save(form) {
    this.dialogRef.close(form.value);
  }
}
