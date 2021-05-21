import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { RemindersService } from '../../services/reminders.service';
import { IDay } from '../calendar/IDay';
import { IReminder } from '../calendar/IRemainder';
import { ReminderModalComponent } from '../reminder-modal/reminder-modal.component';

@Component({
  selector: 'app-reminders-viewer',
  templateUrl: './reminders-viewer.component.html',
  styleUrls: ['./reminders-viewer.component.less']
})
export class RemindersViewerComponent implements OnInit {

  @Input()
  day: IDay;

  orderedReminders: IReminder[] = [];

  constructor(
    public dialog: MatDialog,
    private remindersService: RemindersService) { }



  ngOnInit() {
    this.remindersService.reminderModified.subscribe(() => {
      this.orderedReminders = this.day.reminders.sort((a: IReminder, b: IReminder) => <any>a.date - <any>b.date)
    })
  }

  getReminderDescription(reminder: IReminder): string {
    return `${reminder.title}`;
  }

  openDialog(reminder) {
    const dialogRef = this.dialog.open(ReminderModalComponent, {
      width: '320px',
      data: { reminder: reminder }
    });
  }

}
