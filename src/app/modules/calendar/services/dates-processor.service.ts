import { Injectable } from '@angular/core';
import { daysOfWeek, IDay, monthsOfYear } from '../components/calendar/IDay';

@Injectable({
  providedIn: 'root'
})
export class DatesProcessorService {

  private days: IDay[] = [];

  constructor() { }

  public getDaysOfMonth(year: number, month: number): IDay[] {
    const currentDate = new Date(year, month +1, 0);
    const currentYear = currentDate.getFullYear();
    const currentMonth = (<monthsOfYear>(currentDate.getMonth()));
    const daysInMonthCounter = currentDate.getDate();

    for (let day = 0; day < daysInMonthCounter; day++) {
      const currentDate = new Date(currentYear, currentMonth, day + 1);

      if (day === 0) {
        this.setDaysLeftAtBeginin(currentDate);
      }

      this.addNewDate(currentDate);

      if (day === daysInMonthCounter - 1) {
        this.setDaysLeftAtEnd(currentDate);
      }
    }

    return this.days;
  }

  private setDaysLeftAtBeginin(initialDate: Date) {
    let currentDay = initialDate.getDay();
    let isSunday = initialDate.getDay() === 0;

    let newDate = new Date(initialDate);

    newDate.setDate(initialDate.getDate() - currentDay);

    while (!isSunday) {

      if (initialDate != newDate) {
        this.addNewDate(newDate);
      }
      newDate.setDate(newDate.getDate() + 1);

      currentDay--;
      isSunday = currentDay === 0;
    }
  }


  private setDaysLeftAtEnd(initialDate: Date) {
    let currentDay = initialDate.getDay();
    let isSaturday = initialDate.getDay() === 6;

    let newDate = new Date(initialDate);
    newDate.setDate(initialDate.getDate() + 1);

    while (!isSaturday) {
      if (initialDate != newDate) {
        this.addNewDate(newDate);
      }
      newDate.setDate(newDate.getDate() + 1);

      currentDay++;
      isSaturday = currentDay === 6;
    }
  }

  private addNewDate(date: Date): void {
    this.days.push({
      date: date,
      dayNumber: <daysOfWeek>date.getDay(),
      dayDateNumber: date.getDate(),
      monthNumber: <monthsOfYear>(date.getMonth())
    });
  }
}
