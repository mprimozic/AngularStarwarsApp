import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { API_BASE_URL, API_SPECIES, API_STARSHIPS } from '../helpers/constants/swapiEndpoints';
import { Observable, map, from, concatMap, mergeMap } from 'rxjs';
import { Specie } from '../helpers/classes/Specie';
import { People } from '../helpers/classes/People';
import { Vehicle } from '../helpers/classes/Vehicle';
import { Starship } from '../helpers/classes/Starship';

@Injectable({
  providedIn: 'root'
})
export class SpeciesService {

  constructor(private http: HttpClient) { }

  getSpecies(...species: string[]): Observable<Specie[]>{
    return from(species).pipe(concatMap(specie => {
      let apiUrl = API_BASE_URL + API_SPECIES + "?search=" + specie;
      return this.http.get<Response>(apiUrl).pipe(map(e => {
        return e.results.map((item: any) => {
          return new Specie(item.name, item.classification, item.designation, item.language, item.people);
        })
      }))
    })) 
  }

  getUser(userUrl: string) : Observable<People>{
    return this.http.get<People>(userUrl).pipe(map(e => {
      return new People(e.name);
    }));
  }

  getVehicle(url: string): Observable<Vehicle[]> {
    let vehicleUrl = API_BASE_URL + url;
    return this.http.get<ResponseVehicle>(vehicleUrl).pipe(map(e => {
      return e.results.map(item => {
        return new Vehicle(item.name, item.model, item.manufacturer, item.cost_in_credits);
      })
    }))
  }

  getStarships(): Observable<Starship[]> {
    let starshipUrl = API_BASE_URL + API_STARSHIPS;
    return this.http.get<ResponseStarship>(starshipUrl).pipe(map(e => {
      return e.results.map(item => {
        return new Starship(item.name, item.model, item.cost_in_credits, item.starship_class);
      })
    }))
  }
}

interface Response {
    results: Specie[];
}
interface ResponseVehicle {
    results: Vehicle[];
}
interface ResponseStarship {
    results: Starship[];
}
