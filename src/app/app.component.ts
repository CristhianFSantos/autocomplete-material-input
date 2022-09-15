import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';

export const NAMES = ['Ana','Antonio','Cristiane','Eduardo','Elisa',]

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  formName: FormGroup;
  
  
  filterNames: Observable<string[]>


  ngOnInit(): void {
    this.formName = new FormGroup({
      inputControl : new FormControl(null)
    })


    this.filterNames = this.formName.controls['inputControl'].valueChanges.pipe(
      startWith(''),
      map(value => this.filter(value || '' )))
  }

  private filter(value: string): string[] {
    const filterValue = this.normalizeValue(value);
    return NAMES.filter(street => this.normalizeValue(street).includes(filterValue));
  }

  private normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }
}
