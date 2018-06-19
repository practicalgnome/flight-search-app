import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class DataService {

  constructor(private http: Http) { }

  getData(params) {
    return this.http.get('http://localhost:3000/search', {params});
  }

}
