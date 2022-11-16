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
  
  userId
  userUpdate //update
  userDataName
  userData
  userDuLieu //nhóm
  newUser //thêm mới user
  userIdDelete //xóa user
  managerData 
  deleteGroupUser //xóa 1 nhóm khỏi người dùng
  @Input ()quyencuaUser: any
  
  groupNew = [
    {
      'groupId': 'GP001',
      'groupName': 'Ban Giám Đốc'
    },
    {
      'groupId': 'GP002',
      'groupName': 'Phòng Tài chính Kế Toán'
    },
    {
      'groupId': 'GP003',
      'groupName': 'Phòng Tổ Chức Hành Chính'
    },
    {
      'groupId': 'GP005',
      'groupName': 'Phòng Kỹ Thuật'
    },
    {
      'groupId': 'GP026',
      'groupName': ' Phòng Kinh Doanh '
    },
    {
      'groupId': 'GP032',
      'groupName': 'Phòng Thoát Nước Mưa'
    },
    {
      'groupId': 'GP033',
      'groupName': 'Phòng Kế Hoạch Tài Vụ'
    },
    {
      'groupId': 'GP035',
      'groupName': 'Phòng Hành Chính Quản Trị'
    },
    {
      'groupId': 'GP036',
      'groupName': 'Phòng Thủy Nông'
    },
  
  ]
  newUserName=  
  {
    "userName": "",
    "fullName": "",
    "password": "",
    "groupIdChinh": "",
    "title": "",
    "email": "",
    "phone": "",
    "isLeader": 0,
    "nguoiTao": "",
    "rights": [],
    "groups": []
  }
  newmanager(event,rightId){
    var newcheck = event.target.checked
    if (newcheck === true) {this.newUserName.rights.push({"rightId":rightId})}
    else {this.newUserName.rights.forEach((x,i)=>{
      if (x.rightId===rightId){this.newUserName.rights.splice(i,1) }
    })}
    console.log(this.newUserName)
  }
  newgroup(event,groupId){
    var newcheck = event.target.checked
    if (newcheck === true) {this.newUserName.groups.push({"groupId":groupId})}
    else {this.newUserName.groups.forEach((x,i)=>{
      if (x.groupId==groupId){this.newUserName.groups.splice(i,1)}
    })}
    console.log(this.newUserName)
  }
  newgroupIdChinh(event){
    this.newUserName.groupIdChinh=event.target.value
  }
  @Input() user: any
  constructor(private httpClient: HttpClient, private api: ApiservicesService, private generalService: GeneralService) { }
  ngOnInit(): void {
    this.individualData('U0042');
    this.DataDulieu();
    this.UserIdData();
    this.DeleteUser(); // xóa người dùng
    this.newUser();

    
    this.deleteGroup('U0042')
  }
  //api tất cả các  quyền của user
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
  //quyền của người dùng
  async individualData(userId){
    try{
      let res
      let result
      res= await this.api.httpCall(this.api.apiLists.getAllRightsByUserld + userId,{},{},'get', true);
      result= <any>res
      this.userDataName = Array.from(result)
      console.log(res)
    }catch{}
  }
  //so sanh quyền
  sosanhUser(phanquyen ){
    var sosanhquyen = false
    this.userDataName.forEach((x)=>{

      if (x.rightId===phanquyen) {
        sosanhquyen = true
      }
    })
    return sosanhquyen ;
  } 
///

//
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
  // xóa một nhóm ra khỏi người dùng
  async deleteGroup(userId){
    try{
      let res
      let result
      res = await this.api.httpCall(this.api.apiLists.removeOneSelectedGroupFromUser + userId,{},{},'post',true);
      result = <any>res
      this.deleteGroupUser = Array.from(result.data)
      console.log('U0042')
    } catch{}
  }
  //them
  async newUserId() {
    try{
      let res
      let result
      res = await this.api.httpCall(this.api.apiLists.addNewUser,{},this.newUserName, 'post', true);
      result = <any>res
      this.newUser = Array.from(result.data)
      console.log(this.newUserName)
    } catch {}
  }
  //nhóm phòng ban

  //

}