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

  adminData
  userData
  usereditDetail = {}
  userDetail( userData ){
    this.usereditDetail={...userData}
  }
  
  constructor(private httpClient: HttpClient, private api: ApiservicesService, private generalService: GeneralService) { }

  ngOnInit(): void {
    this.GetUserData();
    this.UserIdData()

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
  async UserIdData(){
    try {
      let res
      let result
      res = await this.api.httpCall(this.api.apiLists.getAllRightsByUserId,{}, {PageNumber:1,PageSize:10}, 'get', true);
      result = <any>res
      this.userData = Array.from(result.data)
    } catch {}
  }

}
