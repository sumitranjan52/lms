import { Component, OnInit } from "@angular/core";
import { DashboardService } from "./services/dashboard.service";
import { EnquiryFormComponent } from "./dialog/enquiry-form/enquiry-form.component";
import { MatDialog } from "@angular/material";
import { AppglobalService } from "./services/appglobal.service";
@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit {
  routes = [];
  sidebar: boolean = true;
  constructor(
    private dash: DashboardService,
    private dialog: MatDialog,
    private gbl: AppglobalService
  ) {}

  ngOnInit() {
    this.dash.doGetRoute("dashboard").subscribe((resp: any) => {
      console.log(resp);
      this.routes = resp.routes;
    });
    this.gbl.sidebar.subscribe((next) => (this.sidebar = next));
  }

  openDialog() {
    let dialogRef = null;
    dialogRef = this.dialog.open(EnquiryFormComponent, {
      width: "450px",
      hasBackdrop: false,
      panelClass: "filter-popup",
    });

    if (dialogRef) {
      dialogRef.afterClosed().subscribe((result) => {
        console.log(result);
        if (result) {
          // this.ser.doPost(result).subscribe(
          //   (resp) => {
          //     console.log(resp);
          //     this.openToast("Record created successfully", 3, "Yay!");
          //   },
          //   (err) => {
          //     console.log(err);
          //     if (
          //       err.status === 401 ||
          //       err.status === 400 ||
          //       err.status === 500
          //     ) {
          //       console.log(err.error.lmsmsg);
          //       this.openToast(err.error.lmsmsg, 3, "Huh!");
          //     }
          //   }
          // );
        }
      });
    }
  }
}
