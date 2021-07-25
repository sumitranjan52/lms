import { Component, OnInit } from "@angular/core";
import { DashboardService } from "src/app/services/dashboard.service";

@Component({
  selector: "app-setup-home",
  templateUrl: "./setup-home.component.html",
  styleUrls: ["./setup-home.component.css"],
})
export class SetupHomeComponent implements OnInit {
  constructor(private dash: DashboardService) {}

  totalMedium: number = 0;
  totalBranch: number = 0;
  totalPartner: number = 0;
  totalState: number = 0;
  totalDistrict: number = 0;

  ngOnInit() {
    this.dash.doGetSummary("setup").subscribe((resp: any) => {
      this.totalMedium = resp.dashboard.total_medium;
      this.totalBranch = resp.dashboard.total_branch;
      this.totalPartner = resp.dashboard.total_partner;
      this.totalState = resp.dashboard.total_state;
      this.totalDistrict = resp.dashboard.total_district;
    });
  }
}
