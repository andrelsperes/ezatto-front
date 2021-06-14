import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
    providedIn: 'root'
  })
export class DateUtilService {


  constructor(


  ) { }

  removeDateReference(originalDate: Date) {
    let dateToConvert: Date = new Date(originalDate.getFullYear(), originalDate.getMonth(), originalDate.getDate());
    return dateToConvert;
  }

  datepickerTransformDate(originalDate: any, pattern: string): string {
    let dateToConvert = Object.assign(originalDate);
    let dateTransformed = new Date(dateToConvert.date.year, dateToConvert.date.month - 1, dateToConvert.date.day );
    return moment(dateTransformed).format(pattern);
  }

  formatDate(originalDate: any, pattern: string): string {
    let dateToConvert = originalDate;
    let dateTransformed = moment(dateToConvert, pattern).toDate();
    return moment(dateTransformed).format(pattern);
  }

  parseDate(originalDate: any, pattern: string): Date {
    let dateToConvert = originalDate;
    return moment(dateToConvert, pattern).toDate();
  }

  plusDays(originalDate: Date, countDays: number) {
    let dateToConvert: Date = new Date(originalDate.getFullYear(), originalDate.getMonth(), originalDate.getDate());
    dateToConvert.setDate(dateToConvert.getDate() + countDays);
    return dateToConvert;
  }

  subtractDays(originalDate: Date, countDays: number) {
    let dateToConvert: Date = this.removeDateReference(originalDate);
    dateToConvert.setDate(dateToConvert.getDate() - countDays);
    return dateToConvert;
  }

  plusMonths(originalDate: Date, countDays: number) {
    let dateToConvert: Date = this.removeDateReference(originalDate);
    dateToConvert.setMonth(dateToConvert.getMonth() + 1) ;
    return dateToConvert;
  }

  subtractMonths(originalDate: Date, countDays: number) {
    let dateToConvert: Date = this.removeDateReference(originalDate);
    dateToConvert.setMonth(dateToConvert.getMonth() - 1) ;
    return dateToConvert;
  }

  firstDayOfMonth(originalDate: Date) {
    let dateToConvert: Date = this.removeDateReference(originalDate);
    let firstDay = new Date(dateToConvert.getFullYear(), dateToConvert.getMonth(), 1);
    return firstDay;
  }

  lastDayOfMonth(originalDate: Date) {
    let dateToConvert: Date = this.removeDateReference(originalDate);
    let lastDate = new Date(dateToConvert.getFullYear(), dateToConvert.getMonth() + 1, 0);
    return lastDate;
  }

}
