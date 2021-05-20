export type daysOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6;
export type monthsOfYear = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;
export interface IDay {

    dayNumber?: daysOfWeek;
    dayDateNumber?: number;
    year?: number;
    monthNumber?: monthsOfYear;
    date: Date;
}
