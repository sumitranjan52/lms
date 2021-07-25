import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "./base.service";

@Injectable()
export class AdmissionService extends BaseService {
  constructor(http: HttpClient) {
    super(http);
    this.url = "admission/";
  }

  doGetAllLeft() {
    return this.client.get(environment.baseUrl + this.path + "l/").pipe();
  }

  doSaveResult(studentId, data) {
    return this.client
      .put(environment.baseUrl + this.path + "result/" + studentId, data)
      .pipe();
  }

  doLeft(id) {
    return this.client
      .delete(environment.baseUrl + this.path + "l/" + id)
      .pipe();
  }

  doTocDelete(id) {
    return this.client
      .delete(environment.baseUrl + this.path + "t/" + id)
      .pipe();
  }

  doPrevQDelete(id) {
    return this.client
      .delete(environment.baseUrl + this.path + "p/" + id)
      .pipe();
  }
}
