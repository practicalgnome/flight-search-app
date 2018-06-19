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

  searchData;
  responseData;
  dataLength;


  onSubmit(form: NgForm) {
    this.searchData = form.value;
    
    this.dataService.getData(form.value)
      .subscribe((response) => {
        this.responseData = response.json();
        this.dataLength = response.json().length;
      });
      form.reset();
  }

  printPage() {
    window.print();
  }
  
}
