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
  monthName: string = '';
  days: IDay[] = [];

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

      this.days.push({
        date: new Date(this.currentYear, this.currentMonth, day + 1)
      });

      if (day === this.daysInMonthCounter - 1) {
        this.setDaysLeftAtEnd(currentDate);
      }
    }
  }

  private setDaysLeftAtBeginin(initialDate: Date) {
    let currentDay = initialDate.getDay();
    let isMonday = initialDate.getDay() === 1;
    let daysAdded: number = 1;
    while (!isMonday) {
      currentDay--;
      let newDate = new Date();
      newDate.setDate(initialDate.getDate() - currentDay)

      this.days.push({
        date: newDate
      });

      isMonday = currentDay === 1;
      daysAdded++;
    }
  }


  private setDaysLeftAtEnd(initialDate: Date) {
    let currentDay = initialDate.getDay();
    let isSunday = initialDate.getDay() === 7;
    while (!isSunday) {
      currentDay++;
      let newDate = new Date();
      newDate.setDate(initialDate.getDate() - currentDay)

      this.days.push({
        date: newDate
      });

      isSunday = currentDay === 7;
    }
  }

  private getDaysInMonth(monthNumber: number): number {
    const daysInMonth = new Date(this.currentYear, monthNumber + 1, 0).getDate();

    return daysInMonth;
  }
}
