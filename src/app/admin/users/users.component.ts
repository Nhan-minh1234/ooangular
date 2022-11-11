import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import data from './users.language';
import { ApiservicesService } from 'src/app/services/api.service';
import { GeneralService } from 'src/app/services/general.service';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  originalUser
  taskList
  searchKey
  userId
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
    this.individualData('U0042')
    
  }
  
  //quyền cho từng user
  

  async GetUserData(){
    try {
      let res
      let result
      res = await this.api.httpCall(this.api.apiLists.getAllUsers,{}, {PageNumber:1,PageSize:50}, 'get', true);
      result = <any>res
      this.userData = Array.from(result.data)
    } catch {}
  }
  // Phân quyền cho user theo userId
  // quyền của tưng user
  async individualData(userId){
    try{
      let res
      let result
      res= await this.api.httpCall(this.api.apiLists.getAllRightsByUserld + userId,{},{},'get', true);
      result= <any>res
      console.log(res)
    }catch{}
  }
  
  ////////////////////////////////////////////////
  getLabel(key) {
    return data[`${this.generalService.currentLanguage.Code}`][`${key}`]
  }
  search() {
    if (this.originalUser != null) {
      let self = this;
      if (this.searchKey != '')
        this.taskList = this.originalUser.filter(function (v, i) {
          if (self.removeAccents(v.chude.toLowerCase()).indexOf(self.removeAccents(self.searchKey)) >= 0
            || self.removeAccents(v.nguoiTaoHoTen.toLowerCase()).indexOf(self.removeAccents(self.searchKey)) >= 0) {
            return true;
          } else false;
        });
      else
        this.taskList = Array.from(this.originalUser)
    }
  }
  removeAccents(str) {
    var AccentsMap = [
      "aàảãáạăằẳẵắặâầẩẫấậ",
      "AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬ",
      "dđ", "DĐ",
      "eèẻẽéẹêềểễếệ",
      "EÈẺẼÉẸÊỀỂỄẾỆ",
      "iìỉĩíị",
      "IÌỈĨÍỊ",
      "oòỏõóọôồổỗốộơờởỡớợ",
      "OÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢ",
      "uùủũúụưừửữứự",
      "UÙỦŨÚỤƯỪỬỮỨỰ",
      "yỳỷỹýỵ",
      "YỲỶỸÝỴ"
    ];
    for (var i = 0; i < AccentsMap.length; i++) {
      var re = new RegExp('[' + AccentsMap[i].substr(1) + ']', 'g');
      var char = AccentsMap[i][0];
      str = str.replace(re, char);
    }
    return str;
  }

  //phân trang
  
}
