import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
// import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class SubjectFeepaymentService extends BaseService {
  // private en = environment;
  constructor(http: HttpClient) {
    super(http);
    this.url = "subjectFeePayment/";
  }
}
