import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Component({
  selector: "app-std-dialog",
  templateUrl: "./std-dialog.component.html",
  styleUrls: ["./std-dialog.component.css"],
})
export class StdDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<StdDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {}

  stdForm: FormGroup;

  ngOnInit() {
    this.stdForm = this.fb.group({
      className: [
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(255),
          Validators.pattern(/^[\w\d \(\)]+$/),
        ]),
      ],
    });

    if (this.data != null && this.data != undefined) {
      this.stdForm.setValue({
        className: this.data.class_name,
      });
    }
  }

  getErrorMessage(controlName, fieldName) {
    const ctrl = this.stdForm.get(controlName);
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

  get className() {
    return this.stdForm.get("className");
  }

  save(form) {
    this.dialogRef.close(form.value);
  }
}
