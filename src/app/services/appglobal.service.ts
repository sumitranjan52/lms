import { Injectable } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatDialog } from "@angular/material";
import { JwtHelperService } from "@auth0/angular-jwt";
import { BehaviorSubject } from "rxjs";
import { PromptDialogComponent } from "../dialog/prompt-dialog/prompt-dialog.component";

@Injectable()
export class AppglobalService {
  constructor(private dialog: MatDialog) {}

  sidebar = new BehaviorSubject(true);

  token: string = null;
  user: any = null;

  redirectUrl;

  admissionData;
  edit = false;
  reAdmission = false;
  selectedStudent;

  set decodedUser(token) {
    this.user = new JwtHelperService().decodeToken(token);
    console.log(this.user);
  }

  compareId(obj1, obj2) {
    return obj1.id === obj2.id;
  }

  control(form, control) {
    return form.get(control) as FormControl;
  }

  getErrorMessage(controlName, form, fieldName) {
    const ctrl =
      controlName instanceof FormControl ? controlName : form.get(controlName);
    if (ctrl.errors.required) {
      return fieldName + " is mandatory.";
    } else if (ctrl.errors.minlength) {
      return (
        fieldName +
        " should have atleast " +
        ctrl.errors.minlength.requiredLength +
        " characters"
      );
    } else if (ctrl.errors.maxlength) {
      return (
        fieldName +
        " cann't exceed " +
        ctrl.errors.maxlength.requiredLength +
        " characters"
      );
    } else if (ctrl.errors.pattern) {
      return fieldName + " is not valid based on pattern";
    } else if (ctrl.errors.email) {
      return fieldName + " is not in valid format";
    }
  }

  getDateInFormat(input) {
    let date = new Date(input);
    let day: string = date.getDate().toString();
    day = +day < 10 ? "0" + day : day;
    let month: string = date.getMonth().toString();
    month = this.getShortMonthName(month);
    return `${day}-${month}-${date.getFullYear()}`;
  }

  getShortMonthName(month) {
    switch (month) {
      case "0":
        return "Jan";
      case "1":
        return "Feb";
      case "2":
        return "Mar";
      case "3":
        return "Apr";
      case "4":
        return "May";
      case "5":
        return "Jun";
      case "6":
        return "Jul";
      case "7":
        return "Aug";
      case "8":
        return "Sep";
      case "9":
        return "Oct";
      case "10":
        return "Nov";
      case "11":
        return "Dec";
      default:
        return "";
    }
  }

  openDialog(type, msg) {
    let option = { width: "400px", panelClass: type, data: { message: msg } };
    switch (type) {
      case "success":
        option.data[type] = true;
        break;
      case "warning":
        option.data[type] = true;
        break;
      case "error":
        option.data[type] = true;
        break;
      default:
        option.data[type] = true;
        break;
    }
    return this.dialog.open(PromptDialogComponent, option).afterClosed().pipe();
  }
}
