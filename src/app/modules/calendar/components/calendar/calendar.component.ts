import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { Subscription } from 'rxjs';
import { DatesProcessorService } from '../../services/dates-processor.service';
import { RemindersService } from '../../services/reminders.service';
import { ReminderModalComponent } from '../reminder-modal/reminder-modal.component';
import { IDay, monthsOfYear } from './IDay';
import { IReminder } from './IRemainder';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.less']
})
export class CalendarComponent implements OnInit, OnDestroy {

  subscriptions: Subscription = new Subscription();

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
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"];


  constructor(
    private datesProcessorService: DatesProcessorService,
    public dialog: MatDialog,
    private remindersService: RemindersService) { }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  ngOnInit(): void {
    this.currentMonth = <monthsOfYear>new Date().getMonth();
    this.currentYear = new Date().getFullYear();
    this.days = this.datesProcessorService.getDaysOfMonth(this.currentYear, this.currentMonth);

    this.subscriptions.add(
      this.remindersService.removeReminder.subscribe(r => {
        if (r.previousDate) {
          this.removeReminder(r);
          this.addReminder(r);
        } else {
          this.removeReminder(r);
        }

        this.remindersService.reminderModified.next();
      }));
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

  openDialog(): void {
    const dialogRef = this.dialog.open(ReminderModalComponent, <MatDialogConfig>{
      width: '320px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe((result: IReminder) => {
      if (result) {
        this.addReminder(result);
        this.remindersService.reminderModified.next();
      }
    });
  }

  removeReminder(reminder: IReminder): void {
    const date = reminder.previousDate !== undefined ? reminder.previousDate : reminder.date;
    let day = this.getDayByDate(date);
    day.reminders = day.reminders.filter(r => r.id !== reminder.id);
  }

  addReminder(reminder: IReminder): void {
    const reminderDate = new Date(reminder.date);
    const day = this.getDayByDate(reminderDate);
    day.reminders = day.reminders || [];
    day.reminders.push(reminder);
  }

  removeRemindersByDay(day: IDay): void {
    if (confirm('Do you want to delete all reminders for this day?')) {
      let currentDay = this.getDayByDate(day.date);
      currentDay.reminders = [];
      this.remindersService.reminderModified.next();
    }
  }


  getDayByDate(date: Date): IDay {
    return this.days.find(d => d.date.getFullYear() === date.getFullYear() && d.date.getMonth() === date.getMonth() && d.date.getDate() === date.getDate());
  }

}
