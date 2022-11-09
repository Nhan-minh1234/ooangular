import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiservicesService } from 'src/app/services/api.service';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-user-manager',
  templateUrl: './user-manager.component.html',
  styleUrls: ['./user-manager.component.css']
})
export class UserManagerComponent implements OnInit {
  
  userData
  userDuLieu //nhóm
  newUser //thêm mới user
  userIdDelete //xóa user
  managerData 
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
  @Input() user: any
  constructor(private httpClient: HttpClient, private api: ApiservicesService, private generalService: GeneralService) { }
  ngOnInit(): void {
    this.DataDulieu();
    this.UserIdData();
    this.DeleteUser();
    this.newUser();
    this.GetUserData
  }
  async DataDulieu() {
    try {
      let res
      let result
      res = await this.api.httpCall(this.api.apiLists.getAllRights, {}, {}, 'get', true);
      result = <any>res
      console.log(result)
      this.managerData = Array.from(result)
    } catch { }

  }
  async UserIdData(){
    try {
      let res
      let result
      res = await this.api.httpCall(this.api.apiLists.getAllRights, {}, {}, 'get', true);
      result = <any>res
      this.userData = Array.from(result.data)
    } catch {}
  }
  //xoa
  async DeleteUser() {
    try{
      let res
      let result
      res = await this.api.httpCall(this.api.apiLists.deleteUser+"?"+"userId"+"="+"U0037", {}, {}, 'post', true);
      result = <any>res
      this.userIdDelete = Array.from(result.data)
      console.log(res)
    } catch {}
  }
  //them
  async newUserId() {
    try{
      let res
      let result
      res = await this.api.httpCall(this.api.apiLists.addNewUser,{},{}, 'post', true);
      result = <any>res
      this.newUser = Array.from(result.data)
    } catch {}
  }
  //nhóm phòng ban
  async GetUserData(){
    try {
      let res
      let result
      res = await this.api.httpCall(this.api.apiLists.getAllUsers,{}, {PageNumber:1,PageSize:10}, 'get', true);
      result = <any>res
      this.userDuLieu = Array.from(result.data)
    } catch {}
  }
}
