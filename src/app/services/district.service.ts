import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";

@Injectable()
export class DistrictService extends BaseService {
  constructor(http: HttpClient) {
    super(http);
    this.url = "district/";
  }
}
