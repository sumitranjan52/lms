import { Component, Inject, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormGroup } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { AdmissionService } from "src/app/services/admission.service";
import { AppglobalService } from "src/app/services/appglobal.service";

@Component({
  selector: "app-result-dialog",
  templateUrl: "./result-dialog.component.html",
  styleUrls: ["./result-dialog.component.css"],
})
export class ResultDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ResultDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private result: AdmissionService,
    private gbl: AppglobalService
  ) {}

  resultForm: FormGroup;

  ngOnInit() {
    this.resultForm = this.fb.group({
      results: this.fb.array([]),
    });

    if (this.data && this.data.mainSub) {
      console.log(this.data.mainSub);
      this.data.mainSub.forEach((subs) => {
        this.results.push(
          this.fb.group({
            id: [subs.id],
            subject: [subs.subject],
            total_fee: [subs.total_fee],
            attempt_date: [subs.attempt_date],
            fee_deposited: [subs.fee_deposited],
            ispass: [this.isPass(subs.ispass)],
            score: [subs.score],
          })
        );
      });
    }
  }

  isPass(ispass) {
    if (ispass == null || ispass == undefined) return false;
    return ispass;
  }

  get results() {
    return this.resultForm.get("results") as FormArray;
  }

  save(value) {
    console.log(value);
    this.result.doSaveResult(this.data.id, value).subscribe(
      (resp: any) => {
        console.log(resp);
        this.gbl.openDialog("success", resp.lmsmsg).subscribe((close) => {
          this.dialogRef.close(true);
        });
      },
      (err) => {
        console.log(err);
        if (err.status === 401 || err.status === 400 || err.status === 500) {
          console.log(err.error.lmsmsg);
          this.gbl.openDialog("error", err.error.lmsmsg);
        }
      }
    );
  }
}
