import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ICountry, IGeoNameResponse } from "./ICountry";
import { filter, map } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})
export class GeoDataService {

    constructor(
        private httpClient: HttpClient
    ) { }

    searchCountries(searchText: string): Observable<ICountry[]> {
        const url = `http://api.geonames.org/searchJSON`;
        let callParams = new HttpParams();

        callParams = callParams.append('lang', 'en');
        callParams = callParams.append('style', 'SHORT');
        callParams = callParams.append('q', 'PCLI');
        callParams = callParams.append('maxRows', '15');
        callParams = callParams.append('username', 'leirbagonerom');
        callParams = callParams.append('name_startsWith', searchText);

        return this.httpClient.get<IGeoNameResponse>(url, { params: callParams }).pipe(map(x=>x.geonames));
    }

    searchCities() {

    }
}