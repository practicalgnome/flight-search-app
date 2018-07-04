import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataService } from './data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalComponent } from './modal/modal.component';
import { MatDialog } from '@angular/material';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private dataService: DataService, private _formBuilder: FormBuilder, public dialog: MatDialog) {}

  originFull;
  destinationFull;
  origin;
  currency;
  response;
  results;
  spinner = false;

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

  keyPress(e) {
    this.dataService.dynSearch({city: e.target.value})
      .subscribe(res => this.dynResultsFrom = res.json());
  }

  //Reactive form
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      from: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      to: ['', Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      date: ['', Validators.required]
    });
  }

  

  onFirstSubmit() {
    this.spinner = true;
    let searchObj = {from:"", to: "", date: ""};
    searchObj.from = this.firstFormGroup.value.from.slice(-4, -1);
    searchObj.to = this.secondFormGroup.value.to.slice(-4, -1);
    let date = this.thirdFormGroup.value.date;
    searchObj.date = `${date.getFullYear()}-0${date.getMonth()+1}-0${date.getDate()}`;

    this.dataService.getData(searchObj)
      .subscribe(res => {
        this.response = res.json()
      });

    setTimeout(() => {
      this.isLoaded = true;
      this.spinner = false;
      this.openDialog();
    }, 1000);
  
  }

  openDialog() {
    const dialogRef = this.dialog.open(ModalComponent, {
      data: {response: this.response, loadStatus: this.isLoaded},
      height: '450px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

  } 
    

    
}



