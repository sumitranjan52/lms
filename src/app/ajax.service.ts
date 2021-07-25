import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AjaxService {

  constructor(private http: HttpClient ) { }

  doPost(url:string, data: any, options: any){
    return this.http.post(url, data, options);
  }

  doGet(url:string, options: any){
    return this.http.get(url, options);
  }

  doPut(url:string, data: any, options: any){
    return this.http.put(url, data, options);
  }

}
