import { Component, OnInit, Inject } from "@angular/core";
import {
  FormGroup,
  FormControl,
  FormArray,
  FormBuilder,
  Validators,
} from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { StdService } from "src/app/services/std.service";
import { SubjectFeeService } from "src/app/services/subject-fee.service";

@Component({
  selector: "app-subject-add-dialog",
  templateUrl: "./subject-add-dialog.component.html",
  styleUrls: ["./subject-add-dialog.component.css"],
})
export class SubjectAddDialogComponent implements OnInit {
  grouplist = null;
  subjectForm: FormGroup;
  standard = null;
  constructor(
    public dialogRef: MatDialogRef<SubjectAddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    public ser: SubjectFeeService
  ) {}

  ngOnInit() {
    this.subjectForm = this.fb.group({
      std: [
        "",
        Validators.compose([
          Validators.minLength(1),
          Validators.maxLength(255),
          Validators.required,
          Validators.pattern(/^[\w0-9 ]+$/),
        ]),
      ],
      group: ["", Validators.compose([Validators.required])],
      subjectName: [
        "",
        Validators.compose([
          Validators.minLength(3),
          Validators.maxLength(255),
          Validators.required,
          Validators.pattern(/^[\w0-9 ]+$/),
        ]),
      ],
      theoryFee: [
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern(/^[0-9]+$/),
        ]),
      ],
      practicalFee: [
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern(/^[0-9]+$/),
        ]),
      ],
    });

    if (this.data != null && this.data != undefined) {
      if (this.data.dataName == "create") {
        this.standard = this.data.dataKey;
      }
      if (this.data.dataName == "edit") {
        this.standard = this.data.dropdownData;
        const element = this.data.dataKey;
        this.grplistCall(element.class_id);
        this.subjectForm.setValue({
          std: element.class_id,
          group: element.group_id,
          subjectName: element.subjectName,
          theoryFee: element.theoryFee,
          practicalFee: element.practicalFee,
        });
      }
    }
  }

  getErrorMessage(controlName, fieldName) {
    const ctrl = this.subjectForm.get(controlName);
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
        " can't exceed " +
        ctrl.errors.maxlength.requiredLength +
        " characters"
      );
    } else if (ctrl.errors.pattern) {
      return fieldName + " is not valid based on pattern";
    }
  }

  get std() {
    return this.subjectForm.get("std");
  }

  get group() {
    return this.subjectForm.get("group");
  }
  get subjectName() {
    return this.subjectForm.get("subjectName");
  }
  get theoryFee() {
    return this.subjectForm.get("theoryFee");
  }
  get practicalFee() {
    return this.subjectForm.get("practicalFee");
  }

  save(form) {
    this.dialogRef.close(form.value);
  }

  grplistCall(id) {
    this.ser.doGetGrplist(id).subscribe(
      (resp: any) => {
        console.log(resp);
        this.grouplist = resp;
      },
      (err) => {
        console.log(err);
        if (err.status === 401 || err.status === 400 || err.status === 500) {
          console.log(err.error.lmsmsg);
        }
      }
    );
  }
}
