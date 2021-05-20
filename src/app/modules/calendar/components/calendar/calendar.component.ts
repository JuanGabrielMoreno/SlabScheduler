import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DatesProcessorService } from '../../services/dates-processor.service';
import { ReminderModalComponent } from '../reminder-modal/reminder-modal.component';
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


  constructor(
    private datesProcessorService: DatesProcessorService,
    public dialog: MatDialog) { }

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

  openDialog(): void {
    const dialogRef = this.dialog.open(ReminderModalComponent, {
      width: '250px',
      //data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //this.animal = result;
    });
  }

}
