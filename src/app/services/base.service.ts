import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable()
export class BaseService {
  private env = environment;
  public url: string;
  constructor(private http: HttpClient) {}

  get client() {
    return this.http;
  }

  get path() {
    return this.url;
  }

  doGetAll() {
    return this.http.get(this.env.baseUrl + this.url).pipe();
  }

  doGet(id) {
    return this.http.get(this.env.baseUrl + this.url + id).pipe();
  }

  doPost(data) {
    return this.http.post(this.env.baseUrl + this.url, data).pipe();
  }

  doPut(id, data) {
    return this.http.put(this.env.baseUrl + this.url + id, data).pipe();
  }

  doDelete(id) {
    return this.http.delete(this.env.baseUrl + this.url + id).pipe();
  }
}
