import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarComponent } from './modules/calendar/components/calendar/calendar.component';
import { MatButtonModule, MatCardModule, MatDatepickerModule, MatDialogModule, MatFormFieldModule, MatIcon, MatIconModule, MatNativeDateModule, MatToolbarModule } from '@angular/material';
import { ReminderModalComponent } from './modules/calendar/components/reminder-modal/reminder-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    ReminderModalComponent
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
    MatNativeDateModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents:[
    ReminderModalComponent
  ]
})
export class AppModule { }
