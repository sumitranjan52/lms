import { Component, OnInit, ViewChild } from "@angular/core";
import {
  MatDialog,
  MatSnackBar,
  MatTableDataSource,
  MatPaginator,
  MatSort,
} from "@angular/material";
import { DeleteDialogComponent } from "src/app/dialog/delete-dialog/delete-dialog.component";
import { SubjectAddDialogComponent } from "src/app/dialog/subject-add-dialog/subject-add-dialog.component";
import { AppglobalService } from "src/app/services/appglobal.service";
import { SubjectFeeService } from "src/app/services/subject-fee.service";
import { StdService } from "../../services/std.service";

@Component({
  selector: "app-subject-fee",
  templateUrl: "./subject-fee.component.html",
  styleUrls: ["./subject-fee.component.css"],
})
export class SubjectFeeComponent implements OnInit {
  dataSource = new MatTableDataSource([]);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns = [
    "standard",
    "groupName",
    "subjectName",
    "theoryFee",
    "practicalFee",
    "actions",
  ];
  dropdownElement = null;

  constructor(
    private dialog: MatDialog,
    public gbl: AppglobalService,
    private ser: SubjectFeeService,
    public std: StdService
  ) {}

  ngOnInit() {
    this.initLoad();
    this.getstd();
  }

  initLoad() {
    this.ser.doGetAll().subscribe(
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

  getstd() {
    this.std.doGetAll().subscribe(
      (resp: any) => {
        console.log(resp);
        this.dropdownElement = resp;
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

  openDialog(action, element?) {
    let dialogRef = null;
    switch (action) {
      case "create":
        dialogRef = this.dialog.open(SubjectAddDialogComponent, {
          width: "450px",
          data: {
            dataName: "create",
            dataKey: this.dropdownElement,
          },
        });
        break;
      case "edit":
        dialogRef = this.dialog.open(SubjectAddDialogComponent, {
          width: "450px",
          data: {
            dataName: "edit",
            dataKey: element,
            dropdownData: this.dropdownElement,
          },
        });
        break;
      case "delete":
        dialogRef = this.dialog.open(DeleteDialogComponent, {
          width: "250px",
          data: element.subjectName,
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
              this.ser.doPost(result).subscribe(
                (resp) => {
                  console.log(resp);
                  this.initLoad();
                  this.gbl.openDialog("success", "Record created successfully");
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
            case "edit":
              this.ser.doPut(element.id, result).subscribe(
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
            case "delete":
              this.ser.doDelete(element.id).subscribe(
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
