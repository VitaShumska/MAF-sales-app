import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import {map} from 'rxjs/add/operator/map';

@Injectable()
export class ApiService {
  API_URL  =  'https://ebrl-test.fa.em2.oraclecloud.com/crmRestApi/resources/11.13.17.11/products';

  constructor(private http: HttpClient) {
  }

  getProperties() {
    // let headers = new HttpHeaders();
    // headers = headers.append("Authorization", "Basic " + btoa("SOAUSER:SOAUSER123"));
    // headers = headers.append("Content-Type", "application/x-www-form-urlencoded");
    // return this.http.get(this.API_URL, {headers});
    return this.http.get(this.API_URL);
  }

  getPropertiesById(id) {
    // let headers = new HttpHeaders();
    // headers = headers.append("Authorization", "Basic " + btoa("SOAUSER:SOAUSER123"));
    // headers = headers.append("Content-Type", "application/x-www-form-urlencoded");
    // return this.http.get(this.API_URL + '/' + id, {headers});
    return this.http.get(this.API_URL + '/' + id);
  }

}
