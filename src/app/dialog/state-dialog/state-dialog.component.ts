import { Component, Inject, OnInit } from "@angular/core";
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Component({
  selector: "app-state-dialog",
  templateUrl: "./state-dialog.component.html",
  styleUrls: ["./state-dialog.component.css"],
})
export class StateDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<StateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {}

  stateForm: FormGroup;

  ngOnInit() {
    this.stateForm = this.fb.group({
      state: this.fb.array([
        this.fb.control(
          "",
          Validators.compose([
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(255),
            Validators.pattern(/^[\w ]+$/),
          ])
        ),
      ]),
    });

    if (this.data != null && this.data != undefined) {
      this.state.at(0).setValue(this.data.state);
    }
  }

  addRow() {
    this.state.push(
      this.fb.control(
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(255),
          Validators.pattern(/^[\w. ]+$/),
        ])
      )
    );
  }

  removeRow(index) {
    this.state.removeAt(index);
  }

  getErrorMessage(controlName, fieldName) {
    const ctrl =
      controlName instanceof FormControl
        ? controlName
        : this.stateForm.get(controlName);
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

  get state() {
    return this.stateForm.get("state") as FormArray;
  }

  save(form) {
    this.dialogRef.close(form.value);
  }
}
