import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import data from './users.language';
import { ApiservicesService } from 'src/app/services/api.service';
import { GeneralService } from 'src/app/services/general.service';
declare var bootstrap: any


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users
  searchKey ='';
  userId
  adminData
  userData
  userIdData
  usereditDetail = {} //biến tạm //
  //phân trang
  spinmerLoading = false
  count = 100;
  config
  counts = 10;
  page = 0;
  pageSize = 10;
  pageSizes = [10, 20, 30];
  paginationConfig
  myModal
  

  //
  userDetail( userData ){
    this.usereditDetail={...userData}
  }
  
    constructor(private httpClient: HttpClient, private api: ApiservicesService, private generalService: GeneralService) { }

  ngOnInit(): void {
    this.GetUserData();
    this.myModal = new bootstrap.Modal(document.getElementById('myModal'), {
      keyboard: false
    })
    console.log(this.myModal)
  }
  
  //quyền cho từng user
  async GetUserData(){
    this.spinmerLoading = true
    let options ={
      PageNumber : this.page,
      PageSize : this.pageSize,
      isPaging : true
    }
    try {
      let res
      let result
      res = await this.api.httpCall(this.api.apiLists.getAllUsers ,{}, options, 'get', true);
      result = <any>res
      this.userData = Array.from(result.data)
      this.users = Array.from(this.userData)
      this.count = result.totalRecords
      this.paginationConfig = {
        id: 'paginationControl',
        itemsPerPage: this.pageSize,
        currentPage: this.page,
        totalItems: this.count
      }
      this.spinmerLoading = false;
    } catch (error){
      this.spinmerLoading = false
      this.myModal.toggle()
    }
  }
  //

  
  ////////////////////////////////////////////////
  getLabel(key) {
    return data[`${this.generalService.currentLanguage.Code}`][`${key}`]
  }
  search() {
    if (this.userData != null) {
      let self = this;
      if (this.searchKey != '')
        this.users = this.userData.filter(function (v, i) {
          if (self.removeAccents(v.userName.toLowerCase()).indexOf(self.removeAccents(self.searchKey)) >= 0
            || self.removeAccents(v.fullName.toLowerCase()).indexOf(self.removeAccents(self.searchKey)) >= 0) {
            return true;
          } else false;
        });
      else
        this.users = Array.from(this.userData)
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
// phân trang
handlePageChange(event): void {
  this.page = event;
  this.GetUserData();
}
handlePageSizeChange(event): void {
  this.pageSize = event.target.value;
  this.page = 0;
  this.GetUserData();
}

}
