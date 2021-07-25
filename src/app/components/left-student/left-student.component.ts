import { Component, OnInit, ViewChild } from "@angular/core";
import {
  MatTableDataSource,
  MatPaginator,
  MatSort,
  MatDialog,
} from "@angular/material";
import { Router, ActivatedRoute } from "@angular/router";
import { AdmissionDialogComponent } from "src/app/dialog/admission-dialog/admission-dialog.component";
import { DeleteDialogComponent } from "src/app/dialog/delete-dialog/delete-dialog.component";
import { ViewStudentDialogComponent } from "src/app/dialog/view-student-dialog/view-student-dialog.component";
import { AdmissionService } from "src/app/services/admission.service";
import { AppglobalService } from "src/app/services/appglobal.service";
import { StdService } from "src/app/services/std.service";

@Component({
  selector: "app-left-student",
  templateUrl: "./left-student.component.html",
  styleUrls: ["./left-student.component.css"],
})
export class LeftStudentComponent implements OnInit {
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
    public std: StdService
  ) {}

  ngOnInit() {
    this.initLoad();
  }

  initLoad() {
    this.admission.doGetAllLeft().subscribe(
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
          data: { dob: element.dob, readmit: true },
        });
        break;
      case "delete":
        dialogRef = this.dialog.open(DeleteDialogComponent, {
          width: "250px",
          data: element.studentName,
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
              this.gbl.selectedStudent = { ...element, ...result };
              this.gbl.reAdmission = true;
              this.router.navigate(["admission", "re"], {
                relativeTo: this.route.parent,
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
            default:
              break;
          }
        }
      });
    }
  }
}
