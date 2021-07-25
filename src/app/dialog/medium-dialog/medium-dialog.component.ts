import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Component({
  selector: "app-medium-dialog",
  templateUrl: "./medium-dialog.component.html",
  styleUrls: ["./medium-dialog.component.css"],
})
export class MediumDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<MediumDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {}

  mediumForm: FormGroup;

  ngOnInit() {
    this.mediumForm = this.fb.group({
      medium: [
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
      this.mediumForm.setValue({
        medium: this.data.medium,
      });
    }
  }

  getErrorMessage(controlName, fieldName) {
    const ctrl = this.mediumForm.get(controlName);
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

  get medium() {
    return this.mediumForm.get("medium");
  }

  save(form) {
    this.dialogRef.close(form.value);
  }
}
