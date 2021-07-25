import { Component, OnInit } from "@angular/core";
import { LoaderService } from "src/app/services/loader.service";

@Component({
  selector: "app-loader",
  templateUrl: "./loader.component.html",
  styleUrls: ["./loader.component.css"],
})
export class LoaderComponent implements OnInit {
  loading: boolean;

  constructor(private loader: LoaderService) {}

  ngOnInit() {
    this.loader.isLoading.subscribe((load) => {
      console.log("load", load);
      this.loading = load;
    });
  }
}
