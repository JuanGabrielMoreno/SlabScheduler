import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Observable } from 'rxjs';
import { GeoDataService } from '../../services/geo-data.service';
import { ICountry } from '../../services/ICountry';
import { RemindersService } from '../../services/reminders.service';
import { IReminder } from '../calendar/IRemainder';
import { IReminderModalData } from './IReminder-modal-data';
import { debounceTime, switchMap } from 'rxjs/operators';
import { WeatherService } from '../../services/weather.service';
import { IWeatherData } from '../../services/IWeatherData';


@Component({
  selector: 'app-reminder-modal',
  templateUrl: './reminder-modal.component.html',
  styleUrls: ['./reminder-modal.component.less']
})
export class ReminderModalComponent implements OnInit {

  FormGrp: FormGroup = new FormGroup({});
  titleCtrl = new FormControl('', [Validators.required, Validators.maxLength(30)]);
  dateCtrl = new FormControl(null, [Validators.required]);
  hoursCtrl = new FormControl();
  minutesCtrl = new FormControl();
  colorInput = new FormControl(null);
  countriesCtrl = new FormControl(null);
  citiesCtrl = new FormControl(null);


  hours: number[] = [];
  minutes: number[] = [];
  countries: Observable<ICountry[]>;
  color: string;

  filteredCountries: Observable<ICountry[]>;
  filteredCities: Observable<ICountry[]>;

  cityWeather: IWeatherData;

  @ViewChild('form', { static: true })
  form: NgForm;

  constructor(
    private countriesService: GeoDataService,
    public dialogRef: MatDialogRef<ReminderModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IReminderModalData,
    private remindersService: RemindersService,
    private weatherService: WeatherService
  ) { }

  ngOnInit(): void {
    this.loadFormControls();
    if (this.data) {
      this.titleCtrl.setValue(this.data.reminder.title);
      this.dateCtrl.setValue(this.data.reminder.date);
      this.hoursCtrl.setValue(this.data.reminder.date.getHours());
      this.minutesCtrl.setValue(this.data.reminder.date.getMinutes());
      this.countriesCtrl.setValue(this.data.reminder.countryCode);
      this.citiesCtrl.setValue(this.data.reminder.cityCode);
      this.color = this.data.reminder.color;

      this.queryWeather(<ICountry>{ name: this.data.reminder.cityCode })
    }

    this.hours = this.getNumerArray(23);
    this.minutes = this.getNumerArray(59);

    this.filteredCountries = this.countriesCtrl.valueChanges.pipe(debounceTime(300),
      switchMap(val => this.countriesService.searchCountries(val)));

    this.filteredCities = this.citiesCtrl.valueChanges.pipe(debounceTime(300),
      switchMap(val => this.countriesService.searchCities(val, this.countriesCtrl.value)));
  }

  loadFormControls(): void {
    this.FormGrp = new FormGroup({
      titleCtrl: this.titleCtrl,
      dateCtrl: this.dateCtrl,
      colorInput: this.colorInput,
      hoursCtrl: this.hoursCtrl,
      minutesCtrl: this.minutesCtrl,
      countriesCtrl: this.countriesCtrl,
      citiesCtrl: this.citiesCtrl
    });
  }

  getNumerArray(maxNumber: number): number[] {
    let arrHours = [];
    for (let index = 0; index <= maxNumber; index++) {
      arrHours.push(index);
    }

    return arrHours;
  }

  addReminder(): void {
    this.form.ngSubmit.next(this.form);
  }

  onSubmit(): void {
    const date = new Date(this.dateCtrl.value);
    date.setHours(this.hoursCtrl.value, this.minutesCtrl.value);

    let reminder: IReminder = {
      id: Date.now(),
      cityCode: this.citiesCtrl.value,
      countryCode: this.countriesCtrl.value,
      color: this.color,
      date: date,
      title: this.titleCtrl.value
    };

    if (this.data) {
      this.data.reminder.title = reminder.title;
      this.data.reminder.color = reminder.color;
      reminder.previousDate = this.data.reminder.date;
      this.data.reminder.date = reminder.date;
      reminder.id = this.data.reminder.id;

      this.remindersService.removeReminder.next(reminder);
    }

    this.dialogRef.close(reminder);
  }

  queryWeather(selectedCity: ICountry): void {
    this.weatherService.getWheatherByCity(selectedCity.name).subscribe(x => {
      if (x.weather) {
        if (x.weather.length > 0) {
          this.cityWeather = x.weather[0];
        }
      }
    });
  }

  deleteReminder(): void {
    if (this.data) {
      if (confirm('Do you want to delete the reminder?')) {
        this.remindersService.removeReminder.next(this.data.reminder);
        this.dialogRef.close();
      }
    }
  }
}
