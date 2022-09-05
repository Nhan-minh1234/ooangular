import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/services/general.service';
import data from './all-text.language';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-all-text',
  templateUrl: './all-text.component.html',
  styleUrls: ['./all-text.component.css']
})
export class AllTextComponent implements OnInit {

  originalTaskList
  taskList
  searchKey
  alltextsData
  count = 500;
  config
  page = 0;
  pageSize = 10;
  pageSizes = [10, 20, 30];
  incomingnamMoi
  newalltextDuLieu = ['Giám đốc', 'Trưởng phòng', 'Nhân viên CNTT']

  constructor(public generalService: GeneralService, private api: HttpClient,) {
  }

  ngOnInit(): void {
    this.taoDuLieu()
    this.tinhNam()

  }
  getLabel(key) {
    return data[`${this.generalService.currentLanguage.Code}`][`${key}`]
  }
  search() {
    if (this.originalTaskList != null) {
      let self = this;
      if (this.searchKey != '')
        this.taskList = this.originalTaskList.filter(function (v, i) {
          if (self.removeAccents(v.chude.toLowerCase()).indexOf(self.removeAccents(self.searchKey)) >= 0
            || self.removeAccents(v.nguoiTaoHoTen.toLowerCase()).indexOf(self.removeAccents(self.searchKey)) >= 0) {
            return true;
          } else false;
        });
      else
        this.taskList = Array.from(this.originalTaskList)
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
  taoDuLieu() {
    this.api.get('https://6315b3ad33e540a6d382505e.mockapi.io/giatrimoi').subscribe((x) => {
      this.alltextsData = x
      this.config = {
        id: 'paging',
        itemsPerPage: this.pageSize,
        currentPage: this.page,
        totalItems: this.alltextsData.length
      }
    })
    console.log(this.alltextsData)
  }
  tinhNam() {
    for (let i = 0; i <= 20; i++) {
      this.incomingnamMoi.push(2022 - i)
    }

  }



  handlePageChange(event): void {
    this.page = event;
    this.taoDuLieu();
  }
  handlePageSizeChange(event): void {
    this.pageSize = event.target.value;
    this.page = 0;
    this.taoDuLieu();
  }

}

