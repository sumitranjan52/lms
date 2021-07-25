import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { StdService } from "src/app/services/std.service";

@Component({
  selector: "app-view-student-dialog",
  templateUrl: "./view-student-dialog.component.html",
  styleUrls: ["./view-student-dialog.component.css"],
})
export class ViewStudentDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ViewStudentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public std: StdService
  ) {}

  ngOnInit() {}

  displayAdd(subjectData) {
    if (subjectData) {
      let returnData = "| ";
      returnData +=
        "Remaining Fee: " +
        (subjectData.total_fee - Number(subjectData.fee_deposited));
      if (subjectData.score) {
        returnData += ", Score: " + subjectData.score;
      }
      if (subjectData.ispass != null)
        returnData += ", " + (subjectData.ispass ? "Pass" : "Fail");
      else returnData += ", Result: Not Declared";
      return returnData;
    }
    return "";
  }

  // for print https://www.learmoreseekmore.com/2020/12/angular-ngx-print-library.html
}
