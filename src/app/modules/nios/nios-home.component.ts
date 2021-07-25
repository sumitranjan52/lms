import { Component, OnInit } from "@angular/core";
import { DashboardService } from "src/app/services/dashboard.service";

@Component({
  selector: "app-nios-home",
  templateUrl: "./nios-home.component.html",
  styleUrls: ["./nios-home.component.css"],
})
export class NiosHomeComponent implements OnInit {
  constructor(private dash: DashboardService) {}

  totalStudent: number = 0;
  activeStudent: number = 0;
  leftStudent: number = 0;

  ngOnInit() {
    this.dash.doGetSummary("nios").subscribe((resp: any) => {
      this.totalStudent = resp.dashboard.total_student;
      this.leftStudent = resp.dashboard.left_student;
      this.activeStudent = this.totalStudent - this.leftStudent;
    });
  }
}
