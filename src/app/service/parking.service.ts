import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Parking } from '../models/parking';


@Injectable({
  providedIn: 'root'
})
export class ParkingService {
  parkingURL="http://localhost:8080/parking"; 

  constructor(private http:HttpClient) { }
  
   create(parking:Parking):Observable<Parking>{
    return this.http.post<Parking>(this.parkingURL,parking);
  }


   update(id: number, parking: Parking):Observable<any>{
    return this.http.put<any>(this.parkingURL+'/'+id,parking);
  }

  public finishParking(id:number): Observable<any>{
    return this.http.get<any>(this.parkingURL + '/finishParking/'+id);
  }



  public existParkingOfUser(id:number):Observable<any>{
    return this.http.get<any>(this.parkingURL + '/existParkingOfUser/'+id);
  }
}
