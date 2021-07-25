import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AppglobalService } from "./services/appglobal.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  constructor(public gbl: AppglobalService, private router: Router) {}
  sidebar: boolean = true;
  ngOnInit() {
    const token = sessionStorage.getItem("lms-token");
    if (token) {
      this.gbl.token = token;
      this.gbl.decodedUser = token;
    }
    this.gbl.sidebar.subscribe((next) => (this.sidebar = next));
  }

  toggleSidebar() {
    this.gbl.sidebar.next(!this.sidebar);
  }

  logout() {
    this.gbl.token = null;
    this.gbl.decodedUser = null;
    sessionStorage.removeItem("lms-token");
    this.router.navigate(["login"]);
  }

  getRole() {
    let role = "S";
    if (this.gbl.user && this.gbl.user.admin) role = "A";
    else if (this.gbl.user && this.gbl.user.teacher) role = "T";
    else role = "S";
    return this.largeRole(role);
  }

  private largeRole(role) {
    switch (role) {
      case "A":
        return "Administrator";
      case "T":
        return "Teacher";
      case "S":
        return "Student";
      default:
        return null;
    }
  }
}
