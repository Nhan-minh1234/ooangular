import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/services/general.service';
import data from './task-autocomplete.language'
@Component({
  selector: 'app-task-autocomplete',
  templateUrl: './task-autocomplete.component.html',
  styleUrls: ['./task-autocomplete.component.css']
})
export class TaskAutocompleteComponent implements OnInit {

  constructor(private generalService: GeneralService) { }
  spinnerLoading = false
  ngOnInit(): void {
  }
  getLabel(key) {
    return data[`${this.generalService.currentLanguage.Code}`][`${key}`]
  }
  generateData() {

  }
  openNewTaskModal() {

  }
}
