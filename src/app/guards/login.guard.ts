import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Observable } from "rxjs";
import { AppglobalService } from "../services/appglobal.service";

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(private gbl: AppglobalService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    const token = sessionStorage.getItem("lms-token");
    console.log(token);
    if (token || this.gbl.token || this.gbl.user) {
      this.router.navigateByUrl("/dashboard");
      return false;
    }
    return true;
  }
}
