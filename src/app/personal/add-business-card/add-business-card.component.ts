import { Component, OnInit } from '@angular/core';
import data from './add-business-card.language';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-add-business-card',
  templateUrl: './add-business-card.component.html',
  styleUrls: ['./add-business-card.component.css']
})
export class AddBusinessCardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
