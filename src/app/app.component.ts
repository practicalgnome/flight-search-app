// import { MatButtonModule } from './material/material.module';
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

  dynResultsFrom;
  dynResultsTo;
  selectedFrom;
  selectedTo;

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
    this.dataService.response = "";
  }

  modalClose() {
    console.log("closed");
    this.errResponse = false;
    this.isLoaded = false;
  }

  printPage() {
    window.print();
  }

  keyPress(e, from) {
    this.dataService.dynSearch(e.target.value)
      .map(res => {        
        from ? this.dynResultsFrom = res.json() : this.dynResultsTo = res.json();
        return res.json()}).subscribe();
  }

  onSelectFrom(e) {
    this.originFull = e.target.value;
    this.selectedFrom = e.target.value.slice(-4,-1);
    console.log(e.target.value);
  }

  onSelectTo(e) {
    this.selectedTo = e.target.value.slice(-4,-1);
    console.log(e.target.value);
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