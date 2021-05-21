import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Observable } from 'rxjs';
import { GeoDataService } from '../../services/geo-data.service';
import { ICountry } from '../../services/ICountry';
import { RemindersService } from '../../services/reminders.service';
import { IReminder } from '../calendar/IRemainder';
import { IReminderModalData } from './IReminder-modal-data';


@Component({
  selector: 'app-reminder-modal',
  templateUrl: './reminder-modal.component.html',
  styleUrls: ['./reminder-modal.component.less']
})
export class ReminderModalComponent implements OnInit {

  FormGrp: FormGroup = new FormGroup({});
  titleCtrl = new FormControl('', [Validators.required]);
  dateCtrl = new FormControl(null, [Validators.required]);
  hoursCtrl = new FormControl();
  minutesCtrl = new FormControl();
  colorInput = new FormControl(null);


  hours: number[] = [];
  minutes: number[] = [];
  countries: Observable<ICountry[]>;
  color: string;

  @ViewChild('form', { static: true })
  form: NgForm;

  constructor(
    private countriesService: GeoDataService,
    public dialogRef: MatDialogRef<ReminderModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IReminderModalData
  ) { }

  ngOnInit() {

    

    this.loadFormControls();
    if (this.data) {
      this.titleCtrl.setValue(this.data.reminder.title);
      this.dateCtrl.setValue(this.data.reminder.date);
      this.hoursCtrl.setValue(this.data.reminder.date.getHours());
      this.minutesCtrl.setValue(this.data.reminder.date.getMinutes());
      this.color = this.data.reminder.color;
    }
    this.hours = this.getNumerArray(23);
    this.minutes = this.getNumerArray(59);


    this.countriesService.searchCountries('col').subscribe(x => {
      console.log(x)

    });
  }

  loadFormControls(): void {
    this.FormGrp = new FormGroup({
      titleCtrl: this.titleCtrl,
      dateCtrl: this.dateCtrl,
      colorInput: this.colorInput,
      hoursCtrl: this.hoursCtrl,
      minutesCtrl: this.minutesCtrl
    });
  }

  getNumerArray(maxNumber: number) {
    let arrHours = [];
    for (let index = 0; index <= maxNumber; index++) {
      arrHours.push(index);
    }

    return arrHours;
  }

  addReminder() {
    this.form.ngSubmit.next(this.form);
  }

  onSubmit(form: NgForm) {
    const title = this.titleCtrl.value;
    const date = new Date(this.dateCtrl.value);
    date.setHours(this.hoursCtrl.value, this.minutesCtrl.value);
    const color = this.color;

    let reminder: IReminder = {
      cityCode: '',
      countryCode: '',
      color: color,
      date: date,
      title: title
    };

    if (this.data) {
      this.data.reminder.title = reminder.title;
      this.data.reminder.color = reminder.color;
      this.data.reminder.date = reminder.date;

      this.dialogRef.close();
    } else {
      this.dialogRef.close(reminder);
    }
  }
}
