import { NgModule } from '@angular/core';
import { MatButtonModule, MatCheckboxModule } from '@angular/material';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  imports: [MatButtonModule, MatCheckboxModule, MatAutocompleteModule, MatFormFieldModule],
  exports: [MatButtonModule, MatCheckboxModule, MatAutocompleteModule, MatFormFieldModule],
})
export class MaterialModule { }
