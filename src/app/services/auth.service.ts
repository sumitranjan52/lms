import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}

  login(cred) {
    return this.http.post(environment.baseUrl + "auth/login", cred).pipe();
  }

  changePassword(value) {
    return this.http
      .post(environment.baseUrl + "auth/change-password", value)
      .pipe();
  }
}
