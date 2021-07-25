import { Component, OnInit } from "@angular/core";
import { AppglobalService } from "src/app/services/appglobal.service";
import { DashboardService } from "src/app/services/dashboard.service";

@Component({
  selector: "app-nios",
  templateUrl: "./nios.component.html",
  styleUrls: ["./nios.component.css"],
})
export class NiosComponent implements OnInit {
  routes = [];
  sidebar: boolean = true;
  constructor(private dash: DashboardService, private gbl: AppglobalService) {}

  ngOnInit() {
    this.dash.doGetRoute("nios").subscribe((resp: any) => {
      console.log(resp);
      this.routes = resp.routes;
    });
    this.gbl.sidebar.subscribe((next) => (this.sidebar = next));
  }
}
