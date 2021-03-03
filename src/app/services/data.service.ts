import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'




@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }
  
  url = 'https://randomapi.com/api/0869eb310dd265b116fba60277429a10?fmt=raw&sole'
  

  getData() {
    return this.http.get(this.url)
      
  }
}
