import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Component({
  selector: "app-gender-dialog",
  templateUrl: "./gender-dialog.component.html",
  styleUrls: ["./gender-dialog.component.css"],
})
export class GenderDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<GenderDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {}

  genderForm: FormGroup;

  ngOnInit() {
    this.genderForm = this.fb.group({
      gender: [
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(255),
          Validators.pattern(/^[\w ]+$/),
        ]),
      ],
    });

    if (this.data != null && this.data != undefined) {
      this.genderForm.setValue({
        gender: this.data.gender,
      });
    }
  }

  getErrorMessage(controlName, fieldName) {
    const ctrl = this.genderForm.get(controlName);
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
    }
  }

  get gender() {
    return this.genderForm.get("gender");
  }

  save(form) {
    this.dialogRef.close(form.value);
  }
}
