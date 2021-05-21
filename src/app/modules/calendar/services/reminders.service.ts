import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { IReminder } from "../components/calendar/IRemainder";

@Injectable({
    providedIn: 'root'
})
export class RemindersService { 
    reminderModified: Subject<IReminder> = new Subject<IReminder>();

}