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
export class AuthGuard implements CanActivate {
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

    if (token || this.gbl.token || this.gbl.user) {
      return true;
    }

    this.gbl.redirectUrl = state.url;
    this.router.navigate(["login"], { queryParams: { redirectTo: state.url } });
    return false;
  }
}
