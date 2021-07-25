import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { BaseService } from "./base.service";

@Injectable({
  providedIn: "root",
})
export class NiosGroupService extends BaseService {
  constructor(http: HttpClient) {
    super(http);
    this.url = "grplist/";
  }

  // doGetAll() {
  //   const data = {};
  //   const options = {};
  //   const url = "grplist";
  //   return this.http.doGet(this.env.baseUrl + url, data);
  // }
}
