import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DatesProcessorService } from '../../services/dates-processor.service';
import { RemindersService } from '../../services/reminders.service';
import { ReminderModalComponent } from '../reminder-modal/reminder-modal.component';
import { daysOfWeek, IDay, monthsOfYear } from './IDay';
import { IReminder } from './IRemainder';

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


  constructor(
    private datesProcessorService: DatesProcessorService,
    public dialog: MatDialog,
    private remindersService: RemindersService) { }

  ngOnInit() {
    this.currentMonth = 4;
    this.currentYear = 2021;
    this.days = this.datesProcessorService.getDaysOfMonth(this.currentYear, this.currentMonth);

    this.remindersService.removeReminder.subscribe(r => {
      if (r.previousDate) {
        this.removeReminder(r);
        this.addReminder(r);
        this.remindersService.reminderModified.next();
      }
    });
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
    const dialogRef = this.dialog.open(ReminderModalComponent, {
      width: '320px',
    });

    dialogRef.afterClosed().subscribe((result: IReminder) => {
      this.addReminder(result);
      this.remindersService.reminderModified.next();
    });
  }

  removeReminder(reminder: IReminder) {
    if (reminder.previousDate) {
      let day = this.days.find(d => d.date.getFullYear() === reminder.previousDate.getFullYear() && d.date.getMonth() === reminder.previousDate.getMonth() && d.date.getDate() === reminder.previousDate.getDate());
      day.reminders = day.reminders.filter(r => r.id !== reminder.id);

    }
  }

  addReminder(reminder: IReminder) {
    const reminderDate = new Date(reminder.date);
    const day = this.days.find(d => d.date.getFullYear() === reminderDate.getFullYear() && d.date.getMonth() === reminderDate.getMonth() && d.date.getDate() === reminderDate.getDate());
    day.reminders = day.reminders || [];
    day.reminders.push(reminder);
  }

}
