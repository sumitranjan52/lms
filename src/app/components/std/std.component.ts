import { Component, OnInit, ViewChild } from "@angular/core";
import {
  MatDialog,
  MatPaginator,
  MatSnackBar,
  MatSort,
  MatTableDataSource,
} from "@angular/material";
import { DeleteDialogComponent } from "src/app/dialog/delete-dialog/delete-dialog.component";
import { StdDialogComponent } from "src/app/dialog/std-dialog/std-dialog.component";
import { StdService } from "src/app/services/std.service";

@Component({
  selector: "app-std",
  templateUrl: "./std.component.html",
  styleUrls: ["./std.component.css"],
})
export class StdComponent implements OnInit {
  dataSource = new MatTableDataSource([]);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns = ["className", "actions"];

  constructor(
    private std: StdService,
    private dialog: MatDialog,
    private toast: MatSnackBar
  ) {}

  ngOnInit() {
    this.initLoad();
  }

  initLoad() {
    this.std.doGetAll().subscribe(
      (resp: any) => {
        this.dataSource = new MatTableDataSource(resp);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (err) => {
        console.log(err);
        if (err.status === 401 || err.status === 400 || err.status === 500) {
          console.log(err.error.lmsmsg);
          this.openToast(err.error.lmsmsg, 3, "Huh!");
        }
      }
    );
  }

  filter(filterValue) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openToast(message: string, time: number, action?: string) {
    this.toast.open(message, action, {
      duration: time * 1000,
      verticalPosition: "top",
    });
  }

  // openDialog(action, element?) {
  //   let dialogRef = null;
  //   switch (action) {
  //     case "create":
  //       dialogRef = this.dialog.open(StdDialogComponent, {
  //         width: "450px",
  //       });
  //       break;
  //     case "edit":
  //       dialogRef = this.dialog.open(StdDialogComponent, {
  //         width: "450px",
  //         data: element,
  //       });
  //       break;
  //     case "delete":
  //       dialogRef = this.dialog.open(DeleteDialogComponent, {
  //         width: "250px",
  //         data: element.class_name,
  //       });
  //       break;
  //     default:
  //       break;
  //   }
  //   if (dialogRef) {
  //     dialogRef.afterClosed().subscribe((result) => {
  //       console.log(result);
  //       if (result) {
  //         switch (action) {
  //           case "create":
  //             this.std.doPost(result).subscribe(
  //               (resp) => {
  //                 console.log(resp);
  //                 this.initLoad();
  //                 this.openToast("Record created successfully", 3, "Yay!");
  //               },
  //               (err) => {
  //                 console.log(err);
  //                 if (
  //                   err.status === 401 ||
  //                   err.status === 400 ||
  //                   err.status === 500
  //                 ) {
  //                   console.log(err.error.lmsmsg);
  //                   this.openToast(err.error.lmsmsg, 3, "Huh!");
  //                 }
  //               }
  //             );
  //             break;
  //           case "edit":
  //             this.std.doPut(element.id, result).subscribe(
  //               (resp: any) => {
  //                 console.log(resp);
  //                 this.initLoad();
  //                 this.openToast(resp.lmsmsg, 3, "Yay!");
  //               },
  //               (err) => {
  //                 console.log(err);
  //                 if (
  //                   err.status === 401 ||
  //                   err.status === 400 ||
  //                   err.status === 500
  //                 ) {
  //                   console.log(err.error.lmsmsg);
  //                   this.openToast(err.error.lmsmsg, 3, "Huh!");
  //                 }
  //               }
  //             );
  //             break;
  //           case "delete":
  //             this.std.doDelete(element.id).subscribe(
  //               (resp: any) => {
  //                 console.log(resp);
  //                 this.initLoad();
  //                 this.openToast(resp.lmsmsg, 3, "Yay!");
  //               },
  //               (err) => {
  //                 console.log(err);
  //                 if (
  //                   err.status === 401 ||
  //                   err.status === 400 ||
  //                   err.status === 500
  //                 ) {
  //                   console.log(err.error.lmsmsg);
  //                   this.openToast(err.error.lmsmsg, 3, "Huh!");
  //                 }
  //               }
  //             );
  //             break;
  //           default:
  //             break;
  //         }
  //       }
  //     });
  //   }
  // }
}
