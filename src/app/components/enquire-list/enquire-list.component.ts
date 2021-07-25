import { Component, OnInit, ViewChild } from "@angular/core";

import {
  MatDialog,
  MatSnackBar,
  MatTableDataSource,
  MatPaginator,
  MatSort,
} from "@angular/material";
import { Router } from "@angular/router";
import { AdmissionDialogComponent } from "src/app/dialog/admission-dialog/admission-dialog.component";
import { AppglobalService } from "src/app/services/appglobal.service";
import { EnquireService } from "src/app/services/enquire.service";
import { EnquiryFormComponent } from "../../dialog/enquiry-form/enquiry-form.component";

@Component({
  selector: "app-enquire-list",
  templateUrl: "./enquire-list.component.html",
  styleUrls: ["./enquire-list.component.css"],
})
export class EnquireListComponent implements OnInit {
  dataSource = new MatTableDataSource([]);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns = ["name", "contact", "remark", "date", "actions"];

  constructor(
    private dialog: MatDialog,
    public gbl: AppglobalService,
    public ser: EnquireService,
    private router: Router
  ) {}

  ngOnInit() {
    this.initLoad();
  }

  initLoad() {
    this.ser.doGet("NIOS").subscribe(
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

  openDialog(action, element?) {
    let dialogRef = null;
    switch (action) {
      case "create":
        dialogRef = this.dialog.open(EnquiryFormComponent, {
          width: "450px",
        });
        break;

      case "admission":
        dialogRef = this.dialog.open(AdmissionDialogComponent, {
          width: "450px",
        });
        break;
    }
    if (dialogRef) {
      dialogRef.afterClosed().subscribe((result) => {
        console.log(result);
        if (result) {
          switch (action) {
            case "admission":
              this.gbl.admissionData = result;
              this.router.navigate(["nios", "admission", "new"]);
              break;
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
          }
        }
      });
    }
  }
}
