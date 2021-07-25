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
import { MatDatepickerInputEvent } from "@angular/material/datepicker";
import { StdService } from "src/app/services/std.service";
import { ExamFeeAddService } from "../../services/exam-fee-add.service";

@Component({
  selector: "app-exam-fee",
  templateUrl: "./exam-fee.component.html",
  styleUrls: ["./exam-fee.component.css"],
})
export class ExamFeeComponent implements OnInit {
  feeDepositForm: FormGroup;
  paymentModes = ["Cash", "Cheque", "UPI"];
  months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Dec",
  ];
  paymentModetype;
  optionextra = false;
  amountToBePaid: number;
  amountToBePaidDuplicate: number;
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
    public dialogRef: MatDialogRef<ExamFeeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    public ser: ExamFeeAddService,
    private stdSer: StdService
  ) {}

  ngOnInit() {
    this.feeDepositForm = this.fb.group({
      studentId: [
        "",
        Validators.compose([Validators.required, Validators.pattern("\\d+")]),
      ],
      paymentMode: ["", Validators.compose([Validators.required])],
      paymentDetails: this.fb.array([]),
      amount: [
        "",
        Validators.compose([Validators.required, Validators.pattern("\\d+")]),
      ],
      penaltyAmount: ["", Validators.compose([Validators.pattern("\\d+")])],
      month: ["", Validators.compose([Validators.required])],
      remark: [
        "",
        Validators.compose([Validators.pattern("^[^~'%#*$*;?|<>+=\\[\\]]*$")]),
      ],
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
      this.studentdetail.class = this.stdSer.doGet(this.data.std).class_name;
    }

    this.feeDepositForm.get("studentId").setValue(this.studentdetail.studentId);

    this.feeDepositForm.get("penaltyAmount").setValue(0);
    //   make a call and get fee_deposited as paid amount a sign to amountToBePaid;
    this.ser.doGet(this.studentdetail.studentId).subscribe((res) => {
      const restAmount = this.studentdetail.fee - res["fee"];
      this.amountToBePaid = restAmount;
      this.amountToBePaidDuplicate = restAmount;
      // this.studentdetail.fee = this.amountToBePaidDuplicate;
    });
  }

  get paymentDet(): FormArray {
    return this.feeDepositForm.get("paymentDetails") as FormArray;
  }

  payModeDetails(val) {
    console.log(val.value);
    const value = val.value;
    if (value === "Cash") {
      this.paymentModetype = "Cash";
      while (this.paymentDet.length > 0) {
        this.paymentDet.removeAt(0);
      }
      this.paymentDet.push(this.addCashfields());
    } else if (value === "Cheque") {
      this.paymentModetype = "Cheque";
      while (this.paymentDet.length > 0) {
        this.paymentDet.removeAt(0);
      }
      this.paymentDet.push(this.addCheque());
    } else {
      this.paymentModetype = "UPI";
      while (this.paymentDet.length > 0) {
        this.paymentDet.removeAt(0);
      }
      this.paymentDet.push(this.addUPI());
    }
  }

  addCashfields(): FormGroup {
    return this.fb.group({
      date: ["", Validators.required],
    });
  }

  addCheque(): FormGroup {
    return this.fb.group({
      payeeName: [
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern(/^[a-zA-Z ]+$/),
        ]),
      ],
      bankName: [
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern(/^[a-zA-Z ]+$/),
        ]),
      ],
      chequeNumber: [
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern(/^[0-9]+$/),
        ]),
      ],
      chequeDate: ["", Validators.compose([Validators.required])],
    });
  }

  addUPI(): FormGroup {
    return this.fb.group({
      date: ["", Validators.compose([Validators.required])],
      transactionId: [
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern(/^[a-zA-Z0-9]+$/),
        ]),
      ],
    });
  }

  date(event: MatDatepickerInputEvent<Date>) {
    console.log(new Date(event.value));
    (this.paymentDet.at(0) as FormGroup).get("date").setValue(event.value);
  }

  dateCheque(event: MatDatepickerInputEvent<Date>) {
    console.log(new Date(event.value));
    (this.paymentDet.at(0) as FormGroup)
      .get("chequeDate")
      .setValue(event.value);
  }

  dateUPI(event: MatDatepickerInputEvent<Date>) {
    console.log(new Date(event.value));
    (this.paymentDet.at(0) as FormGroup).get("date").setValue(event.value);
  }

  addPenalty(ev) {
    console.log(ev);
    const val = ev.checked;
    if (val != true) {
      this.optionextra = false;
      this.feeDepositForm.get("penaltyAmount").setErrors(null);
      this.amountToBePaid = this.amountToBePaidDuplicate;
    } else {
      this.optionextra = true;
      this.feeDepositForm
        .get("penaltyAmount")
        .setValidators(
          Validators.compose([
            Validators.required,
            Validators.pattern(/^[0-9]+$/),
          ])
        );
    }
  }

  updateAmount(A: Event) {
    const penaltyAmt = (A.target as HTMLInputElement).value;
    if ((A as KeyboardEvent).key == "Enter") {
      this.amountToBePaid = this.amountToBePaidDuplicate + Number(penaltyAmt);
    }
  }

  getErrorMessage(controlName, fieldName) {
    const ctrl =
      controlName instanceof FormControl
        ? controlName
        : this.feeDepositForm.get(controlName);
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
    // this.ser.doPost(feeDepositForm.value).subscribe((res) => {
    //   console.log(res);
    // });
    this.dialogRef.close(feeDepositForm.value);
  }
}
