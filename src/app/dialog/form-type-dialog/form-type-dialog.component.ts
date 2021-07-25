import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Component({
  selector: "app-form-type-dialog",
  templateUrl: "./form-type-dialog.component.html",
  styleUrls: ["./form-type-dialog.component.css"],
})
export class FormTypeDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<FormTypeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {}

  typesForm: FormGroup;

  ngOnInit() {
    this.typesForm = this.fb.group({
      formType: [
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(255),
          Validators.pattern(/^[\w0-9 ]+$/),
        ]),
      ],
      formFee: [
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(8),
          Validators.pattern(/^(([1-9]{1})([\d]{1,7})?)$/),
        ]),
      ],
    });

    if (this.data != null && this.data != undefined) {
      this.typesForm.setValue({
        formType: this.data.form_type,
        formFee: this.data.form_fee,
      });
    }
  }

  getErrorMessage(controlName, fieldName) {
    const ctrl = this.typesForm.get(controlName);
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

  get formType() {
    return this.typesForm.get("formType");
  }

  get formFee() {
    return this.typesForm.get("formFee");
  }

  save(form) {
    this.dialogRef.close(form.value);
  }
}
