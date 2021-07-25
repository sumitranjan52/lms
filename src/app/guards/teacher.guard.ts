import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Observable } from "rxjs";
import { AppglobalService } from "../services/appglobal.service";

@Injectable()
export class TeacherGuard implements CanActivate {
  constructor(private gbl: AppglobalService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    const token = sessionStorage.getItem("lms-token");

    if (!(token || this.gbl.token || this.gbl.user)) return false;
    return true;
  }
}
