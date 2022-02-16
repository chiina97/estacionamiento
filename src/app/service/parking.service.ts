import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Parking } from '../models/parking';

@Injectable({
  providedIn: 'root',
})
export class ParkingService {
  parkingURL = 'http://localhost:8080/parking';

  constructor(private http: HttpClient) {}

  create(parking: Parking): Observable<Parking> {
    return this.http.post<Parking>(this.parkingURL, parking);
  }

  public finishParking(id: number): Observable<any> {
    return this.http.get<any>(this.parkingURL + '/finishParking/' + id);
  }

  public getTime(id: number): Observable<any> {
    return this.http.get<any>(this.parkingURL + '/getTime/' + id);
  }

  public existStartedParkingOfUser(id: number): Observable<any> {
    return this.http.get<any>(this.parkingURL + '/existParkingOfUser/' + id);
  }
}
