import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { LoaderService } from "./services/loader.service";

// https://www.digitalocean.com/community/tutorials/how-to-use-angular-interceptors-to-manage-http-requests-and-error-handling#:~:text=The%20Angular%20Interceptor%20was%20introduced,%2C%20response%2C%20and%20error%20handling.
@Injectable()
export class InterceptorService implements HttpInterceptor {
  constructor(private router: Router, private loader: LoaderService) {}

  requests: HttpRequest<any>[] = [];

  removeRequest(req: HttpRequest<any>) {
    const i = this.requests.indexOf(req);
    if (i >= 0) {
      this.requests.splice(i, 1);
    }
    this.loader.isLoading.next(this.requests.length > 0);
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const autReq = req.clone({
      headers: req.headers.set(
        "Authorization",
        "Bearer " + sessionStorage.getItem("lms-token")
      ),
    });
    console.log("reqs", this.requests);
    this.requests.push(autReq);
    console.log("reqs", this.requests);
    this.loader.isLoading.next(true);

    return next.handle(autReq).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          console.log("response");
          this.removeRequest(autReq);
          console.log("event--->>>", event);
        }
        return event;
      }),
      catchError((error) => {
        if (error instanceof HttpErrorResponse) {
          console.log("error");
          this.removeRequest(autReq);
          console.error(error);
          if (error.status === 401) {
            this.router.navigate(["login"]);
          }
        }

        return throwError(error);
      })
    );
  }
}
