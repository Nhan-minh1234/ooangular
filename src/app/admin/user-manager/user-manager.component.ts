import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-manager',
  templateUrl: './user-manager.component.html',
  styleUrls: ['./user-manager.component.css']
})
export class UserManagerComponent implements OnInit {
  rights = [
    {
      'id': 'pheDuyetDonVi',
      'title': 'Phê duyệt lịch đơn vị'
    },
    {
      'id': 'dkLichDonVi',
      'title': 'Đăng ký lịch đơn vị'
    },
    {
      'id': 'qtAllUser',
      'title': 'Quản trị tất cả người dùng'
    },
    {
      'id': 'dkLichTuan',
      'title': 'Đăng ký lịch tuần'
    },
    {
      'id': 'duyetLichTuan',
      'title': 'Duyệt lịch tuần'
    },
  ]
  group = [
    {
      'id': 'pBoss',
      'title': 'Ban Giám Đốc'
    },
    {
      'id': 'pIT',
      'title': 'Phòng kỹ thuật'
    }
  ]
  @Input() user: Object
  constructor() { }
  ngOnInit(): void {
  }

}
