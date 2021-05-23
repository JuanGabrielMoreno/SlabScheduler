import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IWeatherResponse } from "./IWeatherResponse";

@Injectable({
    providedIn: 'root'
})
export class WeatherService {

    constructor(
        private httpClient: HttpClient
    ) { }

    getWheatherByCity(cityName: string): Observable<IWeatherResponse> {
        const url = 'http://api.openweathermap.org/data/2.5/weather';
        const apiKey = '7b569b52247ad038380830f2c7f14dbe';
        let params = new HttpParams();

        params = params.append('q', cityName);
        params = params.append('appid', apiKey);

        return this.httpClient.get<IWeatherResponse>(url, { params: params });
    }
}