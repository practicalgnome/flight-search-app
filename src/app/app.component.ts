import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataService } from './data.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private dataService: DataService) {}

  originFull;
  destinationFull;
  origin;
  currency;
  results;

  errResponse = false;
  isLoaded = false;

  onSubmit(form: NgForm) {
    this.originFull = form.value.from;
    this.destinationFull = form.value.to;
    this.dataService.getData(form.value);
    setTimeout(() => {
      if (this.dataService.response) {
        this.origin = this.dataService.response.origin;
        this.currency = this.dataService.response.currency;
        this.results = this.dataService.response.results;
        this.isLoaded = true;
      } else {
        this.errResponse = true;
        this.isLoaded = true;
      }
    }, 1000);
    
    form.reset();
  }

  modalClose() {
    console.log("closed");
    this.errResponse = false;
    this.isLoaded = false;
  }

  printPage() {
    window.print();
  }

}

// {
//   "origin" : "MUC",
//   "currency" : "EUR",
//   "results" : [ {
//     "destination" : "BKK",
//     "departure_date" : "2018-06-26",
//     "price" : "411.44",
//     "airline" : "TG"
//   } ]
// }