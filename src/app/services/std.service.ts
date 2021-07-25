import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class StdService {
  arr = [
    { id: "X", class_name: "Secondary (X)" },
    { id: "XII", class_name: "Sr. Secondary (XII)" },
  ];

  doGetAll() {
    return new Observable((subscriber) => {
      subscriber.next(this.arr);
    }).pipe();
  }

  doGet(id) {
    return this.arr.filter((val) => val.id == id)[0];
  }
}
