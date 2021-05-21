export interface IReminder {
    id: number;
    title: string;
    date: Date;
    color: string;
    countryCode: string;
    cityCode: string;
    previousDate?: Date;
}