import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Observable } from 'rxjs';
import { GeoDataService } from '../../services/geo-data.service';
import { ICountry } from '../../services/ICountry';
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
  // let colorInput = new FormControl(null);
  hoursCtrl = new FormControl();
  minutesCtrl = new FormControl();


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
    this.hours = this.getNumerArray(23);
    this.minutes = this.getNumerArray(59);


    this.countriesService.searchCountries('col').subscribe(x => {
      console.log(x)

    });
  }

  loadFormControls(): void {
    // let titleCtrl = new FormControl('', [Validators.required]);
    // let dateCtrl = new FormControl(null, [Validators.required]);
    // // let colorInput = new FormControl(null);
    // let hoursCtrl = new FormControl();
    // let minutesCtrl = new FormControl();

    this.FormGrp = new FormGroup({
      titleCtrl: this.titleCtrl,
      dateCtrl: this.dateCtrl,
      //   colorInput: colorInput,
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
    let date = new Date(this.dateCtrl.value);
    date.setHours(this.hoursCtrl.value, this.minutesCtrl.value);

    let reminder: IReminder = {
      cityCode: '', color: '', countryCode: '', date: date, title: title

    };

    this.dialogRef.close(reminder);
  }
}
