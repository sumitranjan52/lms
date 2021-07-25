import { Component, Inject, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { EnquireService } from "src/app/services/enquire.service";

@Component({
  selector: 'app-enquiry-form',
  templateUrl: './enquiry-form.component.html',
  styleUrls: ['./enquiry-form.component.css']
})
export class EnquiryFormComponent implements OnInit {
  enquiryForm: FormGroup
  courseTypes = ["NIOS", "UNIVERSITY", "COURSE"];
  constructor(public dialogRef: MatDialogRef<EnquiryFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private fb:FormBuilder, public ser: EnquireService ) { }

  ngOnInit() {
    this.enquiryForm = this.fb.group({
      name       : ["", Validators.compose([Validators.required, Validators.maxLength(20)])],
      contact    : ["", Validators.compose([Validators.required, Validators.maxLength(10)])],
      courseType : ["", Validators.compose([Validators.required])],
      remark     : [""] 
    })
  }

  get name(){
    return this.enquiryForm.get('name');
  }

  get contact() {
      return this.enquiryForm.get('contact');
  }

  get courseType() {
    return this.enquiryForm.get('courseType');
  }

  get remark() {
    return this.enquiryForm.get('remark');
  }
  getErrorMessage(controlName, fieldName) {
    const ctrl =
      controlName instanceof FormControl
        ? controlName
        : this.enquiryForm.get(controlName);
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

    save(form) {
    console.log(form.value);
    this.dialogRef.close(form.value);
  }

}
