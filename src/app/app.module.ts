import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarComponent } from './modules/calendar/components/calendar/calendar.component';
import { MatAutocompleteModule, MatButtonModule, MatCardModule, MatDatepickerModule, MatDialogModule, MatFormFieldModule, MatIcon, MatIconModule, MatInputModule, MatNativeDateModule, MatSelectModule, MatToolbarModule, MatTooltipModule } from '@angular/material';
import { ReminderModalComponent } from './modules/calendar/components/reminder-modal/reminder-modal.component';
import { HttpClientModule } from '@angular/common/http';
import { ColorPickerModule } from 'ngx-color-picker';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RemindersViewerComponent } from './modules/calendar/components/reminders-viewer/reminders-viewer.component';

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    ReminderModalComponent,
    RemindersViewerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatCardModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    MatSelectModule,
    HttpClientModule,
    ColorPickerModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatTooltipModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents:[
    ReminderModalComponent
  ]
})
export class AppModule { }
