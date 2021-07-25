import { Injectable } from "@angular/core";
import { MatDateFormats, NativeDateAdapter } from "@angular/material";

@Injectable()
export class LMSDateAdapter extends NativeDateAdapter {
  format(date: Date, displayFormat: Object) {
    if (displayFormat === "input") {
      let day: string = date.getDate().toString();
      day = +day < 10 ? "0" + day : day;
      let month: string = date.getMonth().toString();
      month = this.getShortMonthName(month);
      return `${day}-${month}-${date.getFullYear()}`;
    }
    return super.format(date, displayFormat);
  }

  parse(value: any) {
    if (typeof value === "string") {
      let dateParts = value.split("-");
      let day = dateParts[0];
      let month = this.getMonthNumber(dateParts[1]);
      let year = dateParts[2];
      return new Date(+year, month, +day);
    }
    let timestamp = typeof value === "number" ? value : Date.parse(value);
    return isNaN(timestamp) ? null : new Date(timestamp);
  }

  deserialize(value: any) {
    if (typeof value === "string") {
      let dateParts = value.split("-");
      let day = dateParts[0];
      let month = this.getMonthNumber(dateParts[1]);
      let year = dateParts[2];
      return new Date(+year, month, +day);
    }
    let timestamp = typeof value === "number" ? value : Date.parse(value);
    return isNaN(timestamp) ? null : new Date(timestamp);
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

  getMonthNumber(month) {
    switch (month) {
      case "Jan":
        return 0;
      case "Feb":
        return 1;
      case "Mar":
        return 2;
      case "Apr":
        return 3;
      case "May":
        return 4;
      case "Jun":
        return 5;
      case "Jul":
        return 6;
      case "Aug":
        return 7;
      case "Sep":
        return 8;
      case "Oct":
        return 9;
      case "Nov":
        return 10;
      case "Dec":
        return 11;
      default:
        return -1;
    }
  }
}

export const LMS_DATE_FORMATS: MatDateFormats = {
  parse: {
    dateInput: { month: "short", year: "numeric", day: "numeric" },
  },
  display: {
    dateInput: "input",
    monthYearLabel: { year: "numeric", month: "numeric" },
    dateA11yLabel: { year: "numeric", month: "long", day: "numeric" },
    monthYearA11yLabel: { year: "numeric", month: "long" },
  },
};
