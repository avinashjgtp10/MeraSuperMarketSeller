import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "dateFormat",
})
export class DateFormatPipe implements PipeTransform {
  transform(value: any, ...args: unknown[]): unknown {
    const months = [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC",
    ];
    let current_datetime = new Date(value);
    let formatted_date =
      current_datetime.getDate() +
      " " +
      months[current_datetime.getMonth()] +
      " " +
      current_datetime.getFullYear();

    return formatted_date;
  }
}
