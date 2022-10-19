import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/services/general.service';
import data from './add-workgroup.language';

@Component({
  selector: 'app-add-workgroup',
  templateUrl: './add-workgroup.component.html',
  styleUrls: ['./add-workgroup.component.css']
})
export class AddWorkgroupComponent implements OnInit {
  
  keyFilter = 
  {key:"nhomcongviec",label:"Nhóm Công Việc"}

  constructor(public generalService: GeneralService) { }

  ngOnInit(): void {
  }
  getLabel(key) {
    return data[`${this.generalService.currentLanguage.Code}`][`${key}`]
  }
}
