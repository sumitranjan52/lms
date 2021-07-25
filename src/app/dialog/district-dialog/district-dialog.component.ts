import { Component, Inject, OnInit } from "@angular/core";
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { StateService } from "src/app/services/state.service";

@Component({
  selector: "app-district-dialog",
  templateUrl: "./district-dialog.component.html",
  styleUrls: ["./district-dialog.component.css"],
})
export class DistrictDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DistrictDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private stateService: StateService
  ) {}

  districtForm: FormGroup;

  states: [];

  ngOnInit() {
    this.stateService.doGetAll().subscribe(
      (resp: any) => {
        console.log(resp);
        this.states = resp;
      },
      (err) => {
        console.log(err);
        if (err.status === 401 || err.status === 400 || err.status === 500) {
          console.log(err.error.lmsmsg);
        }
      }
    );

    this.districtForm = this.fb.group({
      state: ["", Validators.required],
      districts: this.fb.array([]),
    });

    if (this.data != null && this.data != undefined) {
      this.districtForm.setValue({
        state: this.data.state_id,
        districts: [],
      });
      this.data.districts.forEach((dist, index) => {
        this.addRow();
        this.districts.at(index).setValue(dist.district);
      });
    }
  }

  addRow() {
    this.districts.push(
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
    this.districts.removeAt(index);
  }

  getErrorMessage(controlName, fieldName) {
    const ctrl =
      controlName instanceof FormControl
        ? controlName
        : this.districtForm.get(controlName);
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
    return this.districtForm.get("state");
  }

  get districts() {
    return this.districtForm.get("districts") as FormArray;
  }

  save(form) {
    this.dialogRef.close(form.value);
  }
}
