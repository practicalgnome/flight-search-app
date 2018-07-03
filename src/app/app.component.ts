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
  response;
  results;

  dynResultsFrom;
  dynResultsTo;
  selectedFrom;
  selectedTo;

  errResponse = false;
  isLoaded = false;

onSubmit(form: NgForm) {

  this.dataService.getData(form.value)
    .subscribe(res => this.response = res.json());
  setTimeout(() => {
    if (this.response) {
      this.origin = this.response.origin;
      this.currency = this.response.currency;
      this.results = this.response.results;
      this.isLoaded = true;
    } else {
      this.errResponse = true;
      this.isLoaded = true;
    
    }
  }, 1000);
  form.reset();
  this.response = "";
}

  modalClose() {
    this.errResponse = false;
    this.isLoaded = false;
    this.dynResultsFrom = [];
    this.dynResultsTo = [];
  }

  printPage() {
    window.print();
  }

  keyPress(e, flag) {
    flag = flag || false;
    this.dataService.dynSearch({city: e.target.value})
      .map(res => {        
        flag ? this.dynResultsFrom = res.json() : this.dynResultsTo = res.json();
        return res.json()})
          .subscribe();
  }

  onSelectFrom(e) {
    this.originFull = e.target.value;
    this.selectedFrom = e.target.value.slice(-4,-1);
  }

  onSelectTo(e) {
    this.destinationFull = e.target.value;
    this.selectedTo = e.target.value.slice(-4,-1);
  }

}