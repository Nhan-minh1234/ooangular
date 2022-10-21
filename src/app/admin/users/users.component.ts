import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiservicesService } from 'src/app/services/api.service';
import { GeneralService } from 'src/app/services/general.service';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  userId='U0001'
  adminData
  userData
  userIdData
  usereditDetail = {} //biến tạm //
  userDetail( userData ){
    this.usereditDetail={...userData}
  }
  
    constructor(private httpClient: HttpClient, private api: ApiservicesService, private generalService: GeneralService) { }

  ngOnInit(): void {
    this.GetUserData();
    this.permissionData()
  }
  async permissionData(){
    try {
      let res
      let result
      res = await this.api.httpCall(this.api.apiLists.getAllRightsByUserld+ this.usereditDetail , {}, {}, 'get', true);
      result = <any>res
      this.userData = Array.from(result.data)
    } catch {}
    
  }
  async GetUserData(){
    try {
      let res
      let result
      res = await this.api.httpCall(this.api.apiLists.getAllUsers,{}, {PageNumber:1,PageSize:10}, 'get', true);
      result = <any>res
      this.userData = Array.from(result.data)
    } catch {}
  }
}
