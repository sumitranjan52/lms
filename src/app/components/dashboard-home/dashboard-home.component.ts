import { Component, OnInit } from "@angular/core";
import { DashboardService } from "src/app/services/dashboard.service";

@Component({
  selector: "app-dashboard-home",
  templateUrl: "./dashboard-home.component.html",
  styleUrls: ["./dashboard-home.component.css"],
})
export class DashboardHomeComponent implements OnInit {
  constructor(private dash: DashboardService) {}

  totalStudent: number = 0;
  activeStudent: number = 0;
  leftStudent: number = 0;
  totalMedium: number = 0;
  totalBranch: number = 0;
  totalPartner: number = 0;
  totalState: number = 0;
  totalDistrict: number = 0;

  ngOnInit() {
    this.dash.doGetSummary("dashboard").subscribe((resp: any) => {
      this.totalStudent = resp.dashboard.total_student;
      this.leftStudent = resp.dashboard.left_student;
      this.activeStudent = this.totalStudent - this.leftStudent;
      this.totalMedium = resp.dashboard.total_medium;
      this.totalBranch = resp.dashboard.total_branch;
      this.totalPartner = resp.dashboard.total_partner;
      this.totalState = resp.dashboard.total_state;
      this.totalDistrict = resp.dashboard.total_district;
    });
  }
}
