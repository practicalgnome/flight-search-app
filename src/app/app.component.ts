import {OnInit, Input} from '@angular/core';
import {Component} from '@angular/core';
import {DataService} from './data.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ModalComponent} from './modal/modal.component';
import {MatDialog} from '@angular/material';
import * as moment from 'moment';
import {parseHttpResponse} from "selenium-webdriver/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  constructor(private dataService: DataService, private _formBuilder: FormBuilder, public dialog: MatDialog) {}

  response;
  activeNext = false;
  spinner = false;
  dynResults = [];
  errResponse = false;
  searchObj = {from: '', to: '', date: ''};
  // Reactive form
  fromForm: FormGroup;
  toForm: FormGroup;
  dateForm: FormGroup;

   printPage() {
    window.print();
  }

  keyPress(e) {
    if (e.target.value.length > 2) {
      this.dataService.dynSearch({city: e.target.value})
        .subscribe(res => {
          this.dynResults = res.json();
        });
    }
  }

  ngOnInit() {
    this.fromForm = this._formBuilder.group({
      from: ['', Validators.required]
    });
    this.toForm = this._formBuilder.group({
      to: ['', Validators.required]
    });
    this.dateForm = this._formBuilder.group({
      date: ['', Validators.required]
    });
  }

  onSubmit(stepper) {
    this.spinner = true;
    this.searchObj.from = this.fromForm.value.from.slice(-4, -1);
    this.searchObj.to = this.toForm.value.to.slice(-4, -1);
    this.searchObj.date = moment(this.dateForm.value.date).format('YYYY-MM-DD');

    this.dataService.getData(this.searchObj)
      .subscribe(res => {
        this.response = res.json();
        console.log(this.response.results.length);
        this.openDialog();
        this.spinner = false;
        stepper.reset();
      });
  }

  clearDyn() {
    this.dynResults = [];
    this.activeNext = false;
  }

  openDialog() {
    const dialogRef = this.dialog.open(ModalComponent, {
      data: {response: this.response},
      height: 'auto',
      width: '970px'
    });

    dialogRef.afterClosed().subscribe(() => {
      this.searchObj = {from: '', to: '', date: ''};
      this.response = '';
      this.dynResults = [];
      this.fromForm.reset();
      this.toForm.reset();
      this.dateForm.reset();

    });

  }


}



