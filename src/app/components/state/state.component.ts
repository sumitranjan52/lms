import { Component, OnInit, ViewChild } from "@angular/core";
import {
  MatTableDataSource,
  MatPaginator,
  MatSort,
  MatDialog,
  MatSnackBar,
} from "@angular/material";
import { DeleteDialogComponent } from "src/app/dialog/delete-dialog/delete-dialog.component";
import { StateDialogComponent } from "src/app/dialog/state-dialog/state-dialog.component";
import { AppglobalService } from "src/app/services/appglobal.service";
import { StateService } from "src/app/services/state.service";

@Component({
  selector: "app-state",
  templateUrl: "./state.component.html",
  styleUrls: ["./state.component.css"],
})
export class StateComponent implements OnInit {
  dataSource = new MatTableDataSource([]);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns = ["state", "actions"];

  constructor(
    private state: StateService,
    private dialog: MatDialog,
    public gbl: AppglobalService
  ) {}

  ngOnInit() {
    this.initLoad();
  }

  initLoad() {
    this.state.doGetAll().subscribe(
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
        dialogRef = this.dialog.open(StateDialogComponent, {
          width: "450px",
        });
        break;
      case "edit":
        dialogRef = this.dialog.open(StateDialogComponent, {
          width: "450px",
          data: element,
        });
        break;
      case "delete":
        dialogRef = this.dialog.open(DeleteDialogComponent, {
          width: "250px",
          data: element.state,
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
              this.state.doPost(result).subscribe(
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
              this.state.doPut(element.id, result).subscribe(
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
              this.state.doDelete(element.id).subscribe(
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
