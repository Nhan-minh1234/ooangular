import { Component, OnInit } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-topic-detail',
  templateUrl: './topic-detail.component.html',
  styleUrls: ['./topic-detail.component.css']
})
export class TopicDetailComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  editorConfig:AngularEditorConfig={
    height:'150px',
    editable:true
  }
}
