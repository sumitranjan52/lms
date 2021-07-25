import { Component, OnInit, ViewChild } from "@angular/core";
import {
  MatTableDataSource,
  MatPaginator,
  MatSort,
  MatDialog,
  MatSnackBar,
} from "@angular/material";
import { ActivatedRoute, Router } from "@angular/router";
import { AdmissionDialogComponent } from "src/app/dialog/admission-dialog/admission-dialog.component";
import { DeleteDialogComponent } from "src/app/dialog/delete-dialog/delete-dialog.component";
import { ExamFeeComponent } from "src/app/dialog/exam-fee/exam-fee.component";
import { LedgerComponent } from "src/app/dialog/ledger/ledger.component";
import { SubjectFeeDialogComponent } from "src/app/dialog/subject-fee-dialog/subject-fee-dialog.component";
import { ResultDialogComponent } from "src/app/dialog/result-dialog/result-dialog.component";
import { ViewStudentDialogComponent } from "src/app/dialog/view-student-dialog/view-student-dialog.component";
import { AdmissionService } from "src/app/services/admission.service";
import { AppglobalService } from "src/app/services/appglobal.service";
import { ExamFeeAddService } from "src/app/services/exam-fee-add.service";
import { StdService } from "src/app/services/std.service";
import { SubjectFeepaymentService } from "src/app/services/subject-feepayment.service";

@Component({
  selector: "app-admission",
  templateUrl: "./admission.component.html",
  styleUrls: ["./admission.component.css"],
})
export class AdmissionComponent implements OnInit {
  dataSource = new MatTableDataSource([]);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns = [
    "username",
    "session",
    "name",
    "father",
    "mobile",
    "std",
    "feeStatus",
    "actions",
  ];

  constructor(
    private admission: AdmissionService,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private gbl: AppglobalService,
    public std: StdService,
    public examFeeService: ExamFeeAddService,
    public subFeepayService: SubjectFeepaymentService
  ) {}

  ngOnInit() {
    this.initLoad();
  }

  initLoad() {
    this.admission.doGetAll().subscribe(
      (resp: any) => {
        console.log(resp);
        this.dataSource = new MatTableDataSource(resp);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
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

  filter(filterValue) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  checkFeeStatus(element) {
    if (element.feePaid[0]) {
      return element.feePaid[0].total_fee_deposit >= element.courseFee
        ? "Paid"
        : "Due";
    }
    return "Due";
  }

  openDialog(action, element?) {
    let dialogRef = null;
    switch (action) {
      case "view":
        dialogRef = this.dialog.open(ViewStudentDialogComponent, {
          width: "80%",
          height: "calc(100vh - 5rem)",
          data: element,
        });
        break;
      case "create":
        dialogRef = this.dialog.open(AdmissionDialogComponent, {
          width: "450px",
        });
        break;
      case "edit":
        this.gbl.selectedStudent = element;
        console.log(this.gbl.selectedStudent);
        this.gbl.edit = true;
        this.router.navigate(["edit"], {
          relativeTo: this.route,
        });
        break;
      case "paydue":
        dialogRef = this.dialog.open(ExamFeeComponent, {
          width: "600px",
          data: element,
        });
        break;
      case "paySubjectFee":
        dialogRef = this.dialog.open(SubjectFeeDialogComponent, {
          width: "600px",
          data: element,
        });
        break;
      case "ledger":
          dialogRef = this.dialog.open(LedgerComponent, {
            width: "800px",
            data: element,
          });
        break;
      case "delete":
        dialogRef = this.dialog.open(DeleteDialogComponent, {
          width: "250px",
          data: element.studentName,
        });
        break;
      case "result":
        dialogRef = this.dialog.open(ResultDialogComponent, {
          width: "600px",
          data: element,
        });
        break;
      case "leave":
        dialogRef = this.dialog.open(DeleteDialogComponent, {
          width: "250px",
          data: { leave: true, msg: element.studentName },
        });
        break;
      default:
        break;
    }
    if (dialogRef) {
      dialogRef.afterClosed().subscribe((result) => {
        console.log(result);
        if (result) {
          switch (action) {
            case "create":
              this.gbl.admissionData = result;
              this.router.navigate(["new"], {
                relativeTo: this.route,
              });
              break;
            case "delete":
              this.admission.doDelete(element.id).subscribe(
                (resp: any) => {
                  console.log(resp);
                  this.initLoad();
                  this.gbl.openDialog("success", resp.lmsmsg);
                },
                (err) => {
                  console.log(err);
                  if (
                    err.status === 401 ||
                    err.status === 400 ||
                    err.status === 500
                  ) {
                    console.log(err.error.lmsmsg);
                    this.gbl.openDialog("error", err.error.lmsmsg);
                  }
                }
              );
              break;
            case "paydue":
              this.examFeeService.doPost(result).subscribe((res: any) => {
                console.log(res);
                this.initLoad();
                this.gbl.openDialog("success", "Amount deposited successfully");
              },
              (err) => {
                console.log(err);
                if (
                  err.status === 401 ||
                  err.status === 400 ||
                  err.status === 500
                ) {
                  console.log(err.error.lmsmsg);
                  this.gbl.openDialog("error", err.error.lmsmsg);
                }
              });
              break;
              case "paySubjectFee":
                this.subFeepayService.doPost(result).subscribe(
                    (resp: any) => {
                      console.log(resp);
                      this.initLoad();
                      this.gbl.openDialog("success", "Subject Fee have been paid");
                    },
                    (err) => {
                      console.log(err);
                      if (
                        err.status === 401 ||
                        err.status === 400 ||
                        err.status === 500
                      ) {
                        console.log(err.error.lmsmsg);
                        this.gbl.openDialog("error", err.error.lmsmsg);
                      }
                    }
                  );
                  break;
                // case "ledger":
                //     this.admission.doDelete(element.id).subscribe(
                //       (resp: any) => {
                //         console.log(resp);
                //         this.initLoad();
                //         this.gbl.openDialog("success", resp.lmsmsg);
                //       },
                //       (err) => {
                //         console.log(err);
                //         if (
                //           err.status === 401 ||
                //           err.status === 400 ||
                //           err.status === 500
                //         ) {
                //           console.log(err.error.lmsmsg);
                //           this.gbl.openDialog("error", err.error.lmsmsg);
                //         }
                //       }
                //     );
                //     break;
            case "result":
              this.initLoad();
              break;
            case "leave":
              this.admission.doLeft(element.id).subscribe(
                (resp: any) => {
                  console.log(resp);
                  this.initLoad();
                  this.gbl.openDialog("success", resp.lmsmsg);
                },
                (err) => {
                  console.log(err);
                  if (
                    err.status === 401 ||
                    err.status === 400 ||
                    err.status === 500
                  ) {
                    console.log(err.error.lmsmsg);
                    this.gbl.openDialog("error", err.error.lmsmsg);
                  }
                }
              );
              break;
            default:
              break;
          }
        }
      });
    }
  }
}
