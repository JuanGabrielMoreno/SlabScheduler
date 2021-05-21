import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material';
import { IDay } from '../calendar/IDay';
import { IReminder } from '../calendar/IRemainder';
import { ReminderModalComponent } from '../reminder-modal/reminder-modal.component';

@Component({
  selector: 'app-reminders-viewer',
  templateUrl: './reminders-viewer.component.html',
  styleUrls: ['./reminders-viewer.component.less']
})
export class RemindersViewerComponent implements OnChanges {

  @Input()
  day: IDay;

  orderedReminders: IReminder[] = [];

  constructor(public dialog: MatDialog) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.day.reminders) {
      this.orderedReminders = this.day.reminders.sort((a, b) => {
        return b.date.getTime() - a.date.getTime();
      })
    }
  }

  ngOnInit() {
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
