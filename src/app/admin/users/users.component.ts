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
    this.DataAdmin();
    this.GetUserData()

  }
  async DataAdmin() {
    console.log(this.generalService.userData)
    try {
      let res
      let result
      res = await this.api.httpCall(this.api.apiLists.getAllRights, {}, {}, 'get', true);
      result = <any>res
      this.adminData = Array.from(result.data)
      console.log(this.adminData)
      console.log('a')
    } catch { }

  }
  async GetUserData(){
    console.log(this.generalService.userData)
    try {
      let res
      let result
      res = await this.api.httpCall(this.api.apiLists.getAllUsers,{}, {PageNumber:1,PageSize:10}, 'get', true);
      result = <any>res
      this.userData = Array.from(result.data)
      console.log(this.userData)
    } catch {}
  }
  
}
