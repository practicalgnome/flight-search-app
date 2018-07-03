import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
// import 'rxjs/Rx';

@Injectable()
export class DataService {

  constructor(private http: Http) { }

  getData(params) {
    return this.http.get(`/search`, {params});
  }

  dynSearch(params) {
    return this.http.get('/city', {params});
  }

}
