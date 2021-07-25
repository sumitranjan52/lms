import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "./base.service";

@Injectable()
export class ExamFeeAddService extends BaseService {
  constructor(http: HttpClient) {
    super(http);
    this.url = "examFee/";
  }

  doGetExamFee(id) {
    return this.client
      .get(environment.baseUrl + this.path + "pay/" + id, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("lms-token"),
        },
      })
      .pipe();
  }
}
