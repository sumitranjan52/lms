import { Component, OnInit, ViewChild } from "@angular/core";
import {
  MatTableDataSource,
  MatPaginator,
  MatSort,
  MatDialog,
  MatSnackBar,
} from "@angular/material";
import { DeleteDialogComponent } from "src/app/dialog/delete-dialog/delete-dialog.component";
import { MediumDialogComponent } from "src/app/dialog/medium-dialog/medium-dialog.component";
import { AppglobalService } from "src/app/services/appglobal.service";
import { MediumService } from "src/app/services/medium.service";

@Component({
  selector: "app-medium",
  templateUrl: "./medium.component.html",
  styleUrls: ["./medium.component.css"],
})
export class MediumComponent implements OnInit {
  dataSource = new MatTableDataSource([]);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns = ["medium", "actions"];

  constructor(
    private medium: MediumService,
    private dialog: MatDialog,
    public gbl: AppglobalService
  ) {}

  ngOnInit() {
    this.initLoad();
  }

  initLoad() {
    this.medium.doGetAll().subscribe(
      (resp: any) => {
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
        dialogRef = this.dialog.open(MediumDialogComponent, {
          width: "450px",
        });
        break;
      case "edit":
        dialogRef = this.dialog.open(MediumDialogComponent, {
          width: "450px",
          data: element,
        });
        break;
      case "delete":
        dialogRef = this.dialog.open(DeleteDialogComponent, {
          width: "250px",
          data: element.medium,
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
              this.medium.doPost(result).subscribe(
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
              this.medium.doPut(element.id, result).subscribe(
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
              this.medium.doDelete(element.id).subscribe(
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
