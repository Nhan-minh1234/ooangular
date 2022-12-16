import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GeneralService } from 'src/app/services/general.service';
import { HttpClient } from '@angular/common/http';
import data from './event.language';
import { Router } from '@angular/router';
import { Event } from 'src/app/Model/Event';
import { ApiservicesService } from 'src/app/services/api.service';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';
import dateFormat, { masks } from 'dateformat';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css'],
})
export class EventListComponent implements OnInit {
  // @ViewChild('TABLE', { static: false }) TABLE: ElementRef;
  // title = 'Excel';
  masterSelectedApproved: boolean;
  masterSelectedNotApproved: boolean;
  checkListNotApproved: Array<any> = [];
  test = 'line-through';
  checkListApproved: Array<any> = [];
  EventNotApproved;
  dateFrom;
  dateTo;
  editable = true;
  eventDetail = {
    date: '',
    title: '',
    description: '',
    location: '',
    time_start: '',
    time_end: '',
    status: null,
  };
  eventSandbox;
  currentTab = true;
  arrDateSelect;
  spinnerLoading = false;
  eventListData;
  page = 0;
  pageSize = 5;
  pageSizes = [5, 10, 15];
  count = 500;
  events = [
    {
      fulldate: '2022-12-12',
      items: [
        {
          title: 'User Module Testing',
          id: 'idk',
          author: 'Nguyen Hoai Thuong',
        },
      ],
    },
  ];
  // events;
  config = {
    id: 'paging',
    itemsPerPage: 5,
    currentPage: 0,
    totalItems: 0,
  };
  constructor(
    private httpClient: HttpClient,
    private el: ElementRef,
    public generalService: GeneralService,
    private router: Router,
    private _location: Location,
    private api: ApiservicesService
  ) {
    this.masterSelectedApproved = false;
    this.masterSelectedNotApproved = false;
  }
  dateSelectedEvents;
  getEvents(a) {
    this.dateSelectedEvents = a;
    console.log(this.dateSelectedEvents);
    console.log(this.getMonday(a.fulldate));
    if (this.currentTab) {
      this.gData(1, this.getMonday(a.fulldate), this.getSunday(a.fulldate));
    } else {
      this.gData(0, this.getMonday(a.fulldate), this.getSunday(a.fulldate));
    }
  }
  ngOnInit() {
    this.getDateArrChenhLech('12-01-2022', '12-12-2022');

    this.getDateEventInMonth();
    console.log(this.events);
    console.log(this.currentTab);
    if (this.currentTab) {
      this.gData(1);
    } else {
      this.gData(0);
    }
  }
  checkhuy(string) {
    if (string == '0') {
      return 'none';
    } else return 'line-through';
  }
  checkToday(stringDate: string) {
    const date = dateFormat(new Date(stringDate.substring(0, 10)), 'isoDate');
    const dateToday = `${new Date().getFullYear()}-${
      new Date().getMonth() + 1
    }-${new Date().getDate()}`;
    if (date == dateToday) {
      return 'rgb(0,145,255)';
    } else {
      return '';
    }
  }
  getDate(date: string) {
    const Newdate = new Date(date);
    const dateDate = Newdate.toDateString();
    const ngay = dateDate.substring(0, 3);
    let thu;
    switch (ngay) {
      case 'Mon':
        thu = 'Thứ Hai';
        break;
      case 'Tue':
        thu = 'Thứ Ba';
        break;
      case 'Wed':
        thu = 'Thứ Tư';
        break;
      case 'Thu':
        thu = 'Thứ Năm';
        break;
      case 'Fri':
        thu = 'Thứ Sáu';
        break;
      case 'Sat':
        thu = 'Thứ bảy';
        break;
      case 'Sun':
        thu = 'Chủ Nhật';
    }
    return thu;
  }
  layThoiGianChenhLech(date: string) {
    const ngayHienTai = new Date().getTime();
    const ngayNhap = new Date(date).getTime();
    const phutNgayHienTai = new Date().getMinutes();
    const phutNgayTruyenVao = new Date(date).getMinutes();
    const millisBetween = ngayHienTai - ngayNhap;
    const days = millisBetween / (1000 * 3600 * 24);
    const result = Math.round(Math.abs(days));
    if (result == 1) {
      return 'Hôm qua';
    } else if (result == 0) {
      if (
        Math.abs(phutNgayHienTai - phutNgayTruyenVao) <= 59 &&
        Math.abs(new Date().getHours() - new Date(date).getHours()) == 1
      ) {
        const phutNgayHienTai = new Date().getMinutes();
        const phutNgayTruyenVao = new Date(date).getMinutes();
        return (
          Math.abs(60 - Math.abs(phutNgayHienTai - phutNgayTruyenVao)) +
          ' phút trước'
        );
      } else if (
        Math.abs(phutNgayHienTai - phutNgayTruyenVao) > 59 &&
        Math.abs(new Date().getHours() - new Date(date).getHours()) != 1
      ) {
        const gioNgayHienTai = new Date().getHours();
        const gioNgayTruyenVao = new Date(date).getHours();
        return (
          Math.abs(Math.abs(gioNgayHienTai - gioNgayTruyenVao)) + ' giờ trước'
        );
      }
      return (
        60 -
        Math.abs(60 - Math.abs(phutNgayHienTai - phutNgayTruyenVao)) +
        ' phút trước'
      );
    } else {
      return result + ' ngày trước';
    }
  }
  getDateArrChenhLech(dateFrom: string, dateTo: string) {
    const dateF = new Date(dateFrom);
    const dateT = new Date(dateTo);
    const dateFTime = new Date(dateFrom).getTime();
    const dateTTime = new Date(dateTo).getTime();
    console.log(dateFTime, dateTTime);
    const millisBetween = dateTTime - dateFTime;
    const days = millisBetween / (1000 * 3600 * 24);
    const result = Math.round(Math.abs(days));
    console.log(result);
    const ArrDate = [];
    if (result >= 1) {
      const stringDateDefault = dateF.getDate();
      for (let i = 0; i <= result; i++) {
        console.log(dateF.getMonth(), dateT.getMonth());
        if (dateF.getMonth() == dateT.getMonth()) {
          const stringDateD =
            (stringDateDefault + i).toString().length == 1
              ? '0' + (stringDateDefault + i).toString()
              : (stringDateDefault + i).toString();
          const stringDate = `${stringDateD}-${
            dateF.getMonth() + 1
          }-${dateF.getFullYear()}`;

          ArrDate.push(stringDate);
        }
      }
      console.log(ArrDate);
      return ArrDate;
    } else {
      return false;
    }
  }
  async getDateEventInMonth() {
    console.log();
    const ArrDate = [];
    if (this.currentTab) {
      const arrAllApp: any = await this.api.httpCall(
        this.api.apiLists.GetAllEventByType + `?type=1`,
        {},
        {},
        'get',
        true
      );
      console.log(arrAllApp);
      arrAllApp.forEach((item) => {
        ArrDate.push({
          fulldate: item.tgbatdau.substring(0, 10),
          items: [
            {
              title: 'User Module Testing',
              id: 'idk',
              author: 'Nguyen Hoai Thuong',
            },
          ],
        });
      });
      console.log(ArrDate);
      this.events = ArrDate;
      console.log(this.events);
    } else {
      const arrAllApp2: any = await this.api.httpCall(
        this.api.apiLists.GetAllEventByType + `?type=0`,
        {},
        {},
        'get',
        true
      );
      const ArrDate2 = [];
      console.log(arrAllApp2);
      arrAllApp2.forEach((item) => {
        ArrDate2.push({
          fulldate: item.tgbatdau.substring(0, 10),
          items: [
            {
              title: 'User Module Testing',
              id: 'idk',
              author: 'Nguyen Hoai Thuong',
            },
          ],
        });
      });
      console.log(ArrDate2);
      this.events = ArrDate2;
      console.log(this.events);
    }
  }
  seeDetail(obj) {
    this.editable = true;
    this.eventDetail = { ...obj };
  }
  editEvent() {
    this.editable = false;
    this.eventSandbox = { ...this.eventDetail };
  }
  cancelEditEvent() {
    this.editable = true;
    this.eventDetail = { ...this.eventSandbox };
  }
  changeTabs(tab) {
    this.currentTab = tab;
    this.masterSelectedApproved = false;
    console.log(tab);
    console.log(this.masterSelectedApproved);
    if (tab) {
      this.masterSelectedApproved = false;
      this.page = 0;
      this.count = 0;
      this.pageSize = this.pageSize;
      this.gData(1);
    } else {
      this.masterSelectedApproved = false;
      this.page = 0;
      this.count = 0;
      this.pageSize = this.pageSize;
      this.gData(0);
    }
    this.getDateEventInMonth();
  }
  goBack() {
    this._location.back();
  }
  openNewEvent() {
    this.router.navigate(['/event/new-event']);
  }
  getMonday(d) {
    d = new Date(d);
    const day = d.getDay(),
      diff = d.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
    const date = dateFormat(new Date(d.setDate(diff)), 'isoDate');
    console.log(date);
    return date;
  }
  getSunday(d) {
    d = new Date(d);
    var day = d.getDay(),
      diff = d.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
    console.log(new Date(d.setDate(diff)));
    const monday = new Date(d.setDate(diff));
    const date = dateFormat(monday.setDate(monday.getDate() + 6), 'isoDate');
    console.log(date);
    return date;
  }
  async gData(n: number, fromdate = new Date(), endDate = new Date()) {
    this.spinnerLoading = true;
    const date1 = new Date(fromdate);
    const date2 = new Date(endDate);
    this.dateFrom = this.getMonday(date1);
    this.dateTo = this.getSunday(date2);
    this.EventNotApproved = await this.api.httpCall(
      this.api.apiLists.GetAllEventByType + `?type=${n}`,
      {},
      {},
      'get',
      true
    );
    this.EventNotApproved = this.EventNotApproved.reverse();
    const test = [...this.EventNotApproved];
    const Arr = test
      .filter((e) => {
        const date = new Date(e.tgbatdau.substring(0, 10));
        const dateF = new Date(this.dateFrom);
        const dateT = new Date(this.dateTo);
        return date >= dateF && date <= dateT;
      })
      .sort((a, b) => {
        const date1: any = new Date(a.tgbatdau);
        const date2: any = new Date(b.tgbatdau);
        return date1 - date2;
      });
    // .sort((a, b) => {
    //   console.log(Number(a.tgbatdau.substring(11, 13)));
    //   const hour1: any = Number(a.tgbatdau.substring(11, 13));
    //   const hour2: any = Number(b.tgbatdau.substring(11, 13));
    //   return hour1 - hour2;
    // });
    // .sort((a, b) => {
    //   const mini1: any = Number(a.tgbatdau.substring(15, 17));
    //   const mini2: any = Number(b.tgbatdau.substring(15, 17));
    //   return mini1 - mini2;
    // });
    this.EventNotApproved = Arr;
    console.log(Arr);
    console.log(this.EventNotApproved);
    console.log(this.config);

    // this.EventNotApproved.filter((i) => i.pheduyet == '0').forEach((item) => {
    //   this.checkListNotApproved.push({
    //     id: item.lichtuanid,
    //     isSelected: false,
    //   });
    // });
    // this.EventNotApproved.filter((i) => i.pheduyet == '1').forEach((item) => {
    //   this.checkListApproved.push({
    //     id: item.lichtuanid,
    //     isSelected: false,
    //   });
    // });
    //  ( n == 0)
    //     ? (this.EventNotApproved.status = this.checkListApproved)
    //     : this.checkListNotApproved;

    this.EventNotApproved.forEach((i) => {
      i.status = false;
    });
    console.log(this.EventNotApproved);
    this.spinnerLoading = false;
  }
  handlePageChange(event): void {
    this.page = event;
    this.masterSelectedApproved = false;
    if (this.currentTab) {
      this.gData(1);
    } else {
      this.gData(0);
    }
  }
  showDSLQ(arrList: any) {
    console.log(arrList);
    let html = '';
    arrList.forEach((item) => {
      html = html + item.hoTen + `<br>`;
    });
    Swal.fire({
      title: '<strong style="color: blue">Danh sách liên quan</strong>',
      html: `<b>${html} </b> `,
      showCancelButton: false,
      focusCancel: false,
    });
  }
  //export exe
  exPortExcel() {
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('LichTuan');

    // worksheet.columns = [
    //   {
    //     header: 'Ngày Bắt Đầu',
    //     key: 'dateF',
    //     width: 40,
    //     style: {
    //       font: { name: 'Arial ', size: 10 },
    //       alignment: { vertical: 'middle', horizontal: 'center' },
    //     },
    //   },
    //   {
    //     header: 'Ngày Kết Thúc',
    //     key: 'dateT',
    //     width: 40,
    //     style: {
    //       font: { name: 'Arial ', size: 10 },
    //       alignment: { vertical: 'middle', horizontal: 'center' },
    //     },
    //   },
    //   {
    //     header: 'Nội dung',
    //     key: 'noidung',
    //     width: 42,
    //     style: {
    //       font: { name: 'Arial ', size: 10 },
    //       alignment: { vertical: 'middle', horizontal: 'center' },
    //     },
    //   },
    //   {
    //     header: 'Địa điểm',
    //     key: 'diadiem',
    //     width: 10,
    //     style: {
    //       font: { name: 'Arial ', size: 10 },
    //       alignment: { vertical: 'middle', horizontal: 'center' },
    //     },
    //   },
    // ];
    // var row = worksheet.addRow([], "n");
    worksheet.mergeCells('A1:E1');
    worksheet.getCell('A1').value = `Lịch Tuần `;
    // worksheet.getCell('A1').alignment = {
    //   vertical: 'middle',
    //   horizontal: 'center',
    // };
    worksheet.getCell('A1').style = {
      font: {
        name: 'Arial Black ',
        size: 14,
        color: { argb: 'blue' },
        bold: true,
      },
      alignment: { vertical: 'middle', horizontal: 'center' },
    };
    worksheet.getCell('A2').style = {
      font: {
        name: 'Arial Black ',
        size: 12,
        bold: true,
      },
      alignment: { vertical: 'middle', horizontal: 'center' },
    };
    worksheet.getCell('A2').value = 'Ngày Giờ Bắt Đầu';
    worksheet.getCell('B2').style = {
      font: {
        name: 'Arial Black ',
        size: 12,
        bold: true,
      },
      alignment: { vertical: 'middle', horizontal: 'center' },
    };
    worksheet.getCell('B2').value = 'Ngày Giờ Kết Thúc';
    worksheet.getCell('C2').style = {
      font: {
        name: 'Arial Black ',
        size: 12,
        bold: true,
      },
      alignment: { vertical: 'middle', horizontal: 'center' },
    };
    worksheet.getCell('C2').value = 'Nội Dung';
    worksheet.getCell('D2').style = {
      font: {
        name: 'Arial Black ',
        size: 12,
        bold: true,
      },
      alignment: { vertical: 'middle', horizontal: 'center' },
    };
    worksheet.getCell('D2').value = 'Danh Sách Liên Quan';
    // this.EventNotApproved.forEach((e) => {
    //   worksheet.addRow(
    //     {
    //       dateF: `${this.getDate(
    //         e.tgbatdau.substring(0, 10)
    //       )}: ${e.tgbatdau.substring(
    //         0,
    //         10
    //       )}- Thời Gian: ${e.tgbatdau.substring(11, 13)}`,
    //       dateT: `${this.getDate(
    //         e.tgketthuc.substring(0, 10)
    //       )}: ${e.tgketthuc.substring(
    //         0,
    //         10
    //       )}- Thời Gian: ${e.tgketthuc.substring(11, 13)}`,
    //       noidung: e.noidung,
    //       diadiem: e.diadiem,
    //     },
    //     'n'
    //   );
    // });

    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      fs.saveAs(blob, 'LichTuan.xlsx');
    });
  }

  getLabel(key) {
    return data[`${this.generalService.currentLanguage.Code}`][`${key}`];
  }
  handlePageSizeChange(event): void {
    this.pageSize = event.target.value;
    console.log(this.pageSize);
    this.page = 0;
    if (this.currentTab) {
      this.gData(1);
    } else {
      this.gData(0);
    }
  }

  /// check
  onChangeChecked(check, values) {
    console.log(check, values);
    if (this.currentTab) {
      if (check) {
        this.checkListApproved.push(values);
      } else {
        if (this.checkListApproved.filter((i) => i == values).length > 0) {
          const arrTam = this.checkListApproved.filter((i) => i != values);
          this.checkListApproved = arrTam;
        } else return false;
      }
    } else {
      if (check) {
        this.checkListNotApproved.push(values);
      } else {
        if (this.checkListNotApproved.filter((i) => i == values).length > 0) {
          const arrTam = this.checkListNotApproved.filter((i) => i != values);
          this.checkListNotApproved = arrTam;
        } else return false;
      }
    }
    console.log(this.checkListNotApproved);
  }
  selectAll(check, arr) {
    console.log(check, arr);
    if (check) {
      if (this.currentTab) {
        this.checkListApproved = [];
        arr.forEach((item) => {
          item.status = true;
          this.checkListApproved.push(item.lichtuanid);
        });
      } else {
        this.checkListApproved = [];
        arr.forEach((item) => {
          item.status = true;
          this.checkListNotApproved.push(item.lichtuanid);
        });
      }
    } else {
      this.checkListApproved = [];
      arr.forEach((item) => {
        item.status = false;
      });
    }
  }
  /// Hủy
  async CancelEvent(id: any) {
    console.log(id);
    Swal.fire({
      title: '<strong>Bạn chắc chắn hủy ?</strong>',
      icon: 'warning',
      html: `sau khi hủy có thể phục hồi được !`,
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      reverseButtons: true,
      focusCancel: true,
      cancelButtonText: `Quay lại`,
      confirmButtonText: `Hủy Lịch`,
    }).then(async (result) => {
      if (result.value) {
        try {
          this.EventNotApproved = await this.api.httpCall(
            this.api.apiLists.CancelAllEvent,
            {},
            [id],
            'post',
            true
          );
          if (this.currentTab) {
            this.gData(1);
          } else {
            this.gData(0);
          }
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Hủy lịch Thành Công',
            showConfirmButton: false,
            timer: 1000,
          });
        } catch (e) {
          console.log(e);
        }
      }
    });
  }
  //Duyệt
  // ApprovedAgain(id) {
  //   console.log(id);
  //   Swal.fire({
  //     title: '<strong>Bạn chắc chắn duyệt ?</strong>',
  //     icon: 'warning',
  //     html: `sau khi duyệt có thể phục hồi được !`,
  //     showCloseButton: true,
  //     showCancelButton: true,
  //     focusConfirm: false,
  //     reverseButtons: true,
  //     focusCancel: true,
  //     cancelButtonText: `Quay lại`,
  //     confirmButtonText: `Duyệt`,
  //   }).then(async (result) => {
  //     if (result.value) {
  //       const arr = this.EventNotApproved.filter(
  //         (item) => item.lichtuanid == id
  //       );
  //       console.log(arr);
  //       if (arr.length > 0) {
  //         arr[0].huy = '0';
  //         this.gData(1);
  //       }
  //     }
  //   });
  // }
  async Approved(id) {
    console.log(id);
    Swal.fire({
      title: '<strong>Bạn chắc chắn duyệt ?</strong>',
      icon: 'warning',
      html: `sau khi duyệt có thể phục hồi được !`,
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      reverseButtons: true,
      focusCancel: true,
      cancelButtonText: `Quay lại`,
      confirmButtonText: `Duyệt`,
    }).then(async (result) => {
      if (result.value) {
        try {
          this.EventNotApproved = await this.api.httpCall(
            this.api.apiLists.AcceptAllEventRequest,
            {},
            [id],
            'post',
            true
          );
          if (this.currentTab) {
            this.changeTabs(true);
            this.gData(1);
          } else {
            this.changeTabs(false);
            this.gData(0);
          }
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Duyệt lịch Thành Công',
            showConfirmButton: false,
            timer: 1000,
          });
        } catch (e) {
          console.log(e);
        }
      }
    });
  }
  async ApprovedMultiple() {
    console.log(this.checkListApproved);
    console.log(this.checkListNotApproved);
    Swal.fire({
      title: '<strong>Bạn chắc chắn duyệt ?</strong>',
      icon: 'warning',
      html: `sau khi duyệt có thể phục hồi được !`,
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      reverseButtons: true,
      focusCancel: true,
      cancelButtonText: `Quay lại`,
      confirmButtonText: `Duyệt`,
    }).then(async (result) => {
      if (result.value) {
        try {
          if (this.currentTab) {
            await this.api.httpCall(
              this.api.apiLists.AcceptAllEventRequest,
              {},
              this.checkListApproved,
              'post',
              true
            );
            if (this.currentTab) {
              this.changeTabs(true);
              this.gData(1);
            } else {
              this.changeTabs(false);
              this.gData(0);
            }
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Duyệt lịch Thành Công',
              showConfirmButton: false,
              timer: 1000,
            });
          } else {
            await this.api.httpCall(
              this.api.apiLists.AcceptAllEventRequest,
              {},
              this.checkListNotApproved,
              'post',
              true
            );
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Duyệt lịch Thành Công',
              showConfirmButton: false,
              timer: 1000,
            });
            if (this.currentTab) {
              this.changeTabs(true);
              this.gData(1);
            } else {
              this.changeTabs(false);
              this.gData(0);
            }
          }
        } catch (e) {
          console.log(e);
        }
      }
    });
  }
  // Xóa
  async deleteEvent(id) {
    console.log(id);
    Swal.fire({
      title: '<strong>Bạn chắc chắn Xóa ?</strong>',
      icon: 'warning',
      html: `sau khi xóa không có thể phục hồi được !`,
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      reverseButtons: true,
      focusCancel: true,
      cancelButtonText: `Quay lại`,
      confirmButtonText: `Xóa`,
    }).then(async (result) => {
      if (result.value) {
        try {
          this.EventNotApproved = await this.api.httpCall(
            this.api.apiLists.DeleteEvent,
            {},
            [id],
            'post',
            true
          );
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Xóa lịch Thành Công',
            showConfirmButton: false,
            timer: 1500,
          });
          if (this.currentTab) {
            this.gData(1);
          } else {
            this.gData(0);
          }
        } catch (e) {
          console.log(e);
        }
      }
    });
  }
  async deleteEventMultiple() {
    console.log(this.checkListApproved);
    console.log(this.checkListNotApproved);
    Swal.fire({
      title: '<strong>Bạn chắc chắn Xóa ?</strong>',
      icon: 'warning',
      html: `sau khi Xóa không có thể phục hồi được !`,
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      reverseButtons: true,
      focusCancel: true,
      cancelButtonText: `Quay lại`,
      confirmButtonText: `Xóa`,
    }).then(async (result) => {
      if (result.value) {
        try {
          if (this.currentTab) {
            await this.api.httpCall(
              this.api.apiLists.DeleteEvent,
              {},
              this.checkListApproved,
              'post',
              true
            );
            this.gData(1);
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Xóa lịch Thành Công',
              showConfirmButton: false,
              timer: 1000,
            });
          } else {
            console.log(this.checkListNotApproved);
            await this.api.httpCall(
              this.api.apiLists.DeleteEvent,
              {},
              this.checkListNotApproved,
              'post',
              true
            );
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Xóa lịch Thành Công',
              showConfirmButton: false,
              timer: 1000,
            });
            this.gData(0);
          }
        } catch (e) {
          console.log(e);
        }
      }
    });
  }
}
