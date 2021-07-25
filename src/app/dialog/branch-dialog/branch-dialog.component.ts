import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Component({
  selector: "app-branch-dialog",
  templateUrl: "./branch-dialog.component.html",
  styleUrls: ["./branch-dialog.component.css"],
})
export class BranchDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<BranchDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {}

  branchForm: FormGroup;

  ngOnInit() {
    this.branchForm = this.fb.group({
      branch: [
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
          Validators.pattern(/^[\w ]+$/),
        ]),
      ],
      address: [
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(500),
          Validators.pattern(/^[\w\d ,-\/]+$/),
        ]),
      ],
    });

    if (this.data != null && this.data != undefined) {
      this.branchForm.setValue({
        branch: this.data.branch,
        address: this.data.address,
      });
    }
  }

  getErrorMessage(controlName, fieldName) {
    const ctrl = this.branchForm.get(controlName);
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

  get branch() {
    return this.branchForm.get("branch");
  }

  get address() {
    return this.branchForm.get("address");
  }

  save(form) {
    this.dialogRef.close(form.value);
  }
}
