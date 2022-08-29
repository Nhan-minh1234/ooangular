import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  fakeAPI = 'https://62e7546c69bd03090f7b852b.mockapi.io/admin_manager'

  component_data
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
  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.getData();
  }
  getData() {
    this.httpClient.get(this.fakeAPI).subscribe((x) => {
      this.component_data = x
    })
  }
  getGroupById(id) {
    let a = this.group.filter((x) => x.id === id)
    return a[0] ? a[0].title : "Chưa tạo"
  }

}
