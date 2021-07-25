import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class DashboardService {
  constructor(private http: HttpClient) {}

  doGetRoute(module?) {
    return this.http.get(environment.baseUrl + "dashboard/r/" + module).pipe();
  }

  doGetSummary(module?) {
    return this.http.get(environment.baseUrl + "dashboard/s/" + module).pipe();
  }
}
