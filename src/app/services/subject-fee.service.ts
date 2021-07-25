import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class SubjectFeeService extends BaseService {
  private en = environment;
  constructor(http: HttpClient) {
    super(http);
    this.url = "subjectFee/";
  }

  doGetGrplist(id) {
    return this.client
      .get(this.en.baseUrl + this.path + "getGrplist/" + id, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("lms-token"),
        },
      })
      .pipe();
  }
}
