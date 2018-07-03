import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
// import 'rxjs/Rx';

@Injectable()
export class DataService {

  constructor(private http: Http) { }

<<<<<<< HEAD
=======
  apiKey = "";
  rootUrl = "https://api.sandbox.amadeus.com/v1.2";
  response;

  dynSearch(params) {
    return this.http.get(`${this.rootUrl}/airports/autocomplete?apikey=${this.apiKey}&term=${params}`);
  }

>>>>>>> 91ccad147f56d1cd2c08a14475de66435e40fde1
  getData(params) {
    return this.http.get(`/search`, {params});
  }

  dynSearch(params) {
    return this.http.get('/city', {params});
  }

}
