import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-avatar-tooltip',
  templateUrl: './avatar-tooltip.component.html',
  styleUrls: ['./avatar-tooltip.component.css']
})
export class AvatarTooltipComponent implements OnInit {

  @Input() fullname: string;
  @Input() size: string;
  constructor() { }

  ngOnInit(): void {
  }

}
