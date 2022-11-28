import { Component, Input, OnInit,SimpleChanges } from '@angular/core';
import { ApiservicesService } from 'src/app/services/api.service';
import { GeneralService } from 'src/app/services/general.service';
import { async } from 'rxjs';
import { trigger } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { stringify } from 'querystring';

@Component({
  selector: 'app-user-manager',
  templateUrl: './user-manager.component.html',
  styleUrls: ['./user-manager.component.css']
})
export class UserManagerComponent implements OnInit {
  
  xoaUser // xóa user
  userDataName // so sánh quyền
  themMoi// Thêm mới người dùng
  managerData // Quyền người dùng
  theGroupsName // nhóm theo userId
  capNhatUser// Cập nhật user
  Mltiple// Gán nhiều quyền
  removeAllRight // Xóa tất cả các quyền khỏi người dùng


  @Input ()quyencuaUser: any ; 
  
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
  constructor(private _http:HttpClient, private api: ApiservicesService, private generalService: GeneralService ) { }
  ngOnInit(): void {
    this.DataDulieu(); // Tất cả các quyền của user
    this.removeAllRightUser()
  }
  // Nguồn so sánh 
  ngOnChanges(user,userId: SimpleChanges): void {
    this.individualData(this.user.userId);
    this.individualgroupUserId(this.user.userId)
  }
  
  // Thêm mới người dùng
  async addUserName(){
    try{
      let res
      let result
      res = await this.api.httpCall(this.api.apiLists.addNewUser,{},this.newUserName,'post', true);
      result = <any>res
      console.log(result)
      this.themMoi=Array.from(result)
    } catch{}
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
    } catch {}
  }

  //quyền của người dùng theo userId
  async individualData(userId : string){
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
// Xóa thông tin người dùng
async deleteUserName(userId :string){
  try{
    let res
    let result
    res = await this.api.httpCall(this.api.apiLists.deleteUser +'?'+'userId'+'='+userId,{},{},'post',true);
    result=<any>res
    this.xoaUser = Array.from(result)
    console.log(res)
  } catch{}
}
// Cập nhật thông tin người dùng 
/*async updateUserName(){
  try{
    let res
    let result
    console.log('a')
    res = await this.api.httpCall(this.api.apiLists.updateUserInfo,{},{},'post',true);
    result=<any>res
    console.log(result)
    this.capNhatUser = Array.from(result)
  } catch{}
}*/
// Gán nhiều quyền được chỉ định cho user
async assignMultiple (userId, rightId){
  try{
    let res
    let result
    res = await this.api.httpCall( this.api.apiLists.assignMultiRightsToUser + userId + rightId,{},{},'post',true);
    result =<any>res
    console.log(res)
    this.Mltiple = Array.from(result)
  }catch{}
}
// Xóa tất cả các quyền ra khỏi người dùng
async removeAllRightUser(){
  try {
    let res
    let result
    console.log('a')
    res = await this.api.httpCall(this.api.apiLists.removeAllRightFromUser,{},{},'post',true);
    result=<any>res
    console.log(res)
    this.removeAllRight=Array.from(result)
  } catch{}
}
//nhóm người dùng theo UserId
async individualgroupUserId(userId : string){
  try{
    let res
    let result
    res = await this.api.httpCall(this.api.apiLists + userId,{},{},'get',true);
    result=<any>res
    this.theGroupsName = Array.from(result)
    console.log(res)
  }catch{}
}
// so sánh nhóm userId
sosanhGroup(group){
  var sosanhnhom = false
  this.theGroupsName.forEach((x)=>{
    if (x.groupId===group) {
      sosanhnhom = true
    }
  })
  return sosanhnhom ;
}
// Ng thi kim phung
}