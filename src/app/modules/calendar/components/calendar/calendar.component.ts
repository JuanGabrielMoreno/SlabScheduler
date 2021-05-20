import { Component, OnInit } from '@angular/core';
import { DatesProcessorService } from '../../services/dates-processor.service';
import { daysOfWeek, IDay, monthsOfYear } from './iday';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.less']
})
export class CalendarComponent implements OnInit {

  
  currentYear: number = 0;
  currentMonth: monthsOfYear;
  days: IDay[] = [];
  daysInWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"]

  months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July", "August", "September", "December"];


  constructor(private datesProcessorService: DatesProcessorService) { }

  ngOnInit() {
    this.currentMonth = 4;
    this.currentYear = 2021;
    this.days = this.datesProcessorService.getDaysOfMonth(this.currentYear, this.currentMonth);
  }

  getMonthName(): string {
    return this.months[<number>this.currentMonth];
  }

  getClass(day: IDay): string {
    let result = '';
    if (day.dayNumber === 0 || day.dayNumber === 6) {
      result += 'weekend-day ';
    }

    if (day.monthNumber !== this.currentMonth) {
      result += 'disabled-day ';
    }
    return result;
  }
}
