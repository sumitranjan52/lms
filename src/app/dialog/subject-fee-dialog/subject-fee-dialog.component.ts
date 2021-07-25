import { Component, OnInit, Inject } from "@angular/core";
import {
  FormGroup,
  FormControl,
  FormArray,
  FormBuilder,
  Validators,
  Form,
} from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { SubjectFeepaymentService } from "src/app/services/subject-feepayment.service";


@Component({
  selector: 'app-subject-fee-dialog',
  templateUrl: './subject-fee-dialog.component.html',
  styleUrls: ['./subject-fee-dialog.component.css']
})
export class SubjectFeeDialogComponent implements OnInit {
  subjectfeeDepositForm: FormGroup;
  paymentMode;
  // optionextra = false;
  amountToBePaid: number;
  // amountToBePaidDuplicate: number;
  preQualYear: number;
  sessionYear: number;
  disabled = false;
  studentdetail = {
    studentId: null,
    name: null,
    fatherName: null,
    contactNumber: null,
    coachingCenter: null,
    branchName: null,
    formType: null,
    fee: null,
    class: null,
  };
  constructor(
    public dialogRef: MatDialogRef<SubjectFeeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder, 
    private ser: SubjectFeepaymentService
  ) {}

  ngOnInit() {
    this.subjectfeeDepositForm = this.fb.group({
      studentId: [
        0,
        Validators.compose([Validators.required, Validators.pattern("\\d+")]),
      ],
      subjectList: this.fb.array([]),
      totalFee: [
        '',
        Validators.compose([Validators.required, Validators.pattern("\\d+")]),
      ],
      paidFee: [
        '',
        Validators.compose([Validators.required, Validators.pattern("\\d+")])
      ]
    });

    if (this.data != null && this.data != undefined) {
      console.log(this.data);
      this.studentdetail.name = this.data.studentName;
      this.studentdetail.fatherName = this.data.fatherName;
      this.studentdetail.contactNumber = this.data.mobile;
      this.studentdetail.coachingCenter = this.data.aiCentre;
      this.studentdetail.branchName = this.data.branchName.branch;
      this.studentdetail.formType = this.data.formType.form_type;
      this.studentdetail.fee = this.data.courseFee;
      this.studentdetail.studentId = this.data.id;
      this.studentdetail.class = this.data.std;
      this.sessionYear = +this.data.sessionYear;
      this.addSubjects(this.data.grpSub);
      if(!this.data.prevQual){
        console.log(this.sessionYear - 2);
        this.preQualYear = this.sessionYear - 2;
         2;
      }else{
        this.preQualYear = this.data.prevQualification[0].year;
      }
    }
    
    this.subjectfeeDepositForm.get("studentId").setValue(this.studentdetail.studentId);

  }

  addSubjects(subjectArray){
    console.log(subjectArray);
    subjectArray.forEach(element => {
      this.SubjectList.push(this.fb.group({
      name : [element.subjectName],
      id : [element.id],
      value : [element.theoryFee + element.practicalFee],
      checked: [false]
      }));
    });
  }

  get SubjectList(): FormArray {
    return this.subjectfeeDepositForm.get("subjectList") as FormArray;
  }

  addAmount(ev, element) {
    //console.log(ev);
    //console.log(element);
    //this.SubjectList.value forEach(element)
    let amount = 0;
    let count = 0;
    for(let control of this.SubjectList.controls){
        console.log(control);
        if(control.value.checked === true){
          count++;
          console.log(<number>(this.sessionYear-this.preQualYear))
          if((count > 4) && (<number>(this.sessionYear-this.preQualYear) < 2 )){
            this.disabled = true;
          }else{
            this.disabled = false;
          }
          amount += control.value.value;
        }
    }
    console.log(amount);
    this.subjectfeeDepositForm.get("totalFee").setValue(amount);
  }

  getErrorMessage(controlName, fieldName) {
    const ctrl =
      controlName instanceof FormControl
        ? controlName
        : this.SubjectList.get(controlName);
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

  save(feeDepositForm) {
    console.log(feeDepositForm.value);
    console.log(feeDepositForm.valid);
    if(feeDepositForm.valid){
      this.dialogRef.close(feeDepositForm.value);
      // this.ser.doPost(feeDepositForm.value).subscribe((res) => {
      //   console.log(res);
      // });
    }
  }

}
