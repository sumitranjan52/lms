import { Component, OnInit ,Inject } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.css']
})
export class ClassComponent implements OnInit {

  classForm: FormGroup;
  selectedItem;
  constructor(public dialogRef: MatDialogRef<ClassComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private fb:FormBuilder) {
   }

  ngOnInit() {

    this.classForm = this.fb.group({
      std: [
        "",
        Validators.compose([
          Validators.required,
        ]),
      ],
      groupName: this.fb.array([]) ,
    });

  }

  getErrorMessage(controlName, fieldName) {
    const ctrl =
      controlName instanceof FormControl
        ? controlName
        : this.classForm.get(controlName);
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

  get std() {
    return this.classForm.get("std");
  }

  setValue(e){
    console.log(e.target.value);
  }

  groupsNm() : FormArray {
    return this.classForm.get("groupName") as FormArray
  }
   
   
  newElement(): FormGroup {
    return this.fb.group({
      newGrpName: [
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(255),
          Validators.pattern(/^[\w0-9 ]+$/),
        ]),
      ],
      subLimit: [
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(8),
          Validators.pattern(/^(([1-9]{1})([\d]{1,7})?)$/),
        ]),
      ],
    })
  }
   
  addElement() {
    this.groupsNm().push(this.newElement());
  }
   
  removeElement(i:number) {
    this.groupsNm().removeAt(i);
  }
                      
  save(form) {
    console.log(form.value);
    this.dialogRef.close(form.value);
  }
}
