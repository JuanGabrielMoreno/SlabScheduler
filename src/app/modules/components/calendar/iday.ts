export type daysOfWeek = 1 | 2 | 3 | 4 | 5 | 6 | 7;
export type monthsOfYear = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
export interface IDay {

    dayNumber?: daysOfWeek;
    dayDateNumber?:number;
    year?: number;
    monthNumber?: monthsOfYear;
    date: Date;
}
