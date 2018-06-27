import { Injectable, OnDestroy } from '@angular/core';
import { Http } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
// import 'rxjs/Rx';

@Injectable()
export class DataService implements OnDestroy {

  constructor(private http: Http) { }

  apiKey = "016oM57ySJJo63PELNetcAan40sphvOj";
  rootUrl = "https://api.sandbox.amadeus.com/v1.2";
  response;

  getData(params) {
    Observable.forkJoin(
      this.http.get(`${this.rootUrl}/airports/autocomplete?apikey=${this.apiKey}&term=${params.from}`)
        .map(res => res.json()),
      this.http.get(`${this.rootUrl}/airports/autocomplete?apikey=${this.apiKey}&term=${params.to}`)
        .map((res) => res.json()),
    )
    .subscribe(res => {
      let paramDate = params.date;
      let paramMonth = paramDate.slice(5, 7);
      let nextDate = paramDate.replace(paramMonth, "0"+(+paramMonth+1));
      return this.http.get(`${this.rootUrl}/flights/extensive-search?apikey=${this.apiKey}&origin=${res[0][0].value}&destination=${res[1][0].value}&departure_date=${params.date}--${nextDate}&one-way=true`)
        .subscribe(
          res => {
            return this.response = res.json()
          }
          // err => console.log(err.status),
          // () => console.log('yay')
        );
    });   
  }

  
  ngOnDestroy() {
    console.log('destrooooyed');
  }
}
