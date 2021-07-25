import { Component, OnInit } from "@angular/core";
import { AppConfig } from "src/config/config";

@Component({
  selector: "app-error404",
  templateUrl: "./error404.component.html",
  styleUrls: ["./error404.component.css"],
})
export class Error404Component implements OnInit {
  appConfig = AppConfig;
  constructor() {}

  ngOnInit() {}
}
