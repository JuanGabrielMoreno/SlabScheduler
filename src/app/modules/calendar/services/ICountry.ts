export interface ICountry {
    name: string;
    countryCode: string;
}

export interface IGeoNameResponse {
    geonames: ICountry[],
    totalResultsCount:number;
}