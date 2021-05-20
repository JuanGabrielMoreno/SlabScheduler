import { Component, OnInit } from '@angular/core';
import { daysOfWeek, IDay, monthsOfYear } from './iday';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.less']
})
export class CalendarComponent implements OnInit {

  daysInMonthCounter: number = 0;
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

  months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "December"];


  constructor() { }

  ngOnInit() {
    const currentDate = new Date();
    this.currentYear = currentDate.getFullYear();
    this.currentMonth = (<monthsOfYear>(currentDate.getMonth()));
    this.daysInMonthCounter = this.getDaysInMonth(currentDate.getMonth());
    for (let day = 0; day < this.daysInMonthCounter; day++) {
      const currentDate = new Date(this.currentYear, this.currentMonth, day + 1);

      if (day === 0) {
        this.setDaysLeftAtBeginin(currentDate);
      }
      else {
        let date = new Date(this.currentYear, this.currentMonth, day + 1);
        this.days.push({
          date: date,
          dayNumber: <daysOfWeek>date.getDay(),
          dayDateNumber: date.getDate()
        });
      }

      if (day === this.daysInMonthCounter - 1) {
        this.setDaysLeftAtEnd(currentDate);
      }
    }
  }

  private setDaysLeftAtBeginin(initialDate: Date) {
    let currentDay = initialDate.getDay() + 1;
    let isSunday = initialDate.getDay() === 0;

    while (!isSunday) {
      currentDay--;
      let newDate = new Date();
      newDate.setDate(initialDate.getDate() - currentDay)

      this.days.push({
        date: newDate
      });

      isSunday = currentDay === 0;
    }
  }


  private setDaysLeftAtEnd(initialDate: Date) {
    let currentDay = initialDate.getDay() + 1;
    let isSaturday = initialDate.getDay() === 6;
    let counter = 1;
    while (!isSaturday) {
      isSaturday = currentDay === 6;
      currentDay++;
      let newDate = new Date();
      newDate.setDate(initialDate.getDate() + counter)

      this.days.push({
        date: newDate
      });

      counter++;
    }
  }

  private getDaysInMonth(monthNumber: number): number {
    const daysInMonth = new Date(this.currentYear, monthNumber + 1, 0).getDate();

    return daysInMonth;
  }

  getMonthName(): string {
    return this.months[<number>this.currentMonth];
  }
}
