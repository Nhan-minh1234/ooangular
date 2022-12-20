import dateFormat, { masks } from 'dateformat';
import { Component, ElementRef, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/services/general.service';
import { HttpClient } from '@angular/common/http';
import data from './event.language';

import { Event } from 'src/app/Model/Event';
import { ApiservicesService } from 'src/app/services/api.service';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AngularEditorConfig } from '@kolkov/angular-editor';
@Component({
  selector: 'app-load-comment',
  templateUrl: './load-comment.component.html',
  styleUrls: ['./load-comment.component.css'],
})
export class LoadCommentComponent implements OnInit {
  date14: Date;
  masterSelectedApproved: boolean;
  masterSelectedNotApproved: boolean;
  checkListNotApproved: Array<any> = [];
  test = 'line-through';
  EventComments;
  comment = { noidung: '' };
  checkListApproved: Array<any> = [];
  EventNotApproved;
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
  repC = {
    nguoi: '',
    noidung: '',
  };
  eventSandbox;
  commentList;
  spinnerLoading = false;
  eventListData;
  editorConfig: AngularEditorConfig = {
    height: '150px',
    editable: true,
  };
  // text = '<div class="demo"><b>This is my HTML.</b></div>';
  constructor(
    private httpClient: HttpClient,
    private el: ElementRef,
    public routerAc: ActivatedRoute,
    public generalService: GeneralService,
    private router: Router,
    private _location: Location,
    private api: ApiservicesService
  ) {
    this.masterSelectedApproved = false;
    this.masterSelectedNotApproved = false;
  }

  ngOnInit(): void {
    this.getById(this.routerAc.snapshot.params['id']);
  }
  getDateArrChenhLech(dateFrom: string, dateTo: string) {
    const dateF = new Date(dateFrom);
    const dateT = new Date(dateTo);
    const dateFTime = new Date(dateFrom).getTime();
    const dateTTime = new Date(dateTo).getTime();
    const millisBetween = dateTTime - dateFTime;
    const days = millisBetween / (1000 * 3600 * 24);
    const result = Math.round(Math.abs(days));
    const ArrDate = [];
    if (result >= 1) {
      const stringDateDefault = dateF.getDate();
      for (let i = 0; i <= result; i++) {
        if (dateF.getMonth() == dateT.getMonth()) {
          const stringDateD =
            (stringDateDefault + i).toString().length == 1
              ? '0' + (stringDateDefault + i).toString()
              : (stringDateDefault + i).toString();
          const stringMonthD =
            (dateF.getMonth() + 1).toString().length == 1
              ? '0' + (dateF.getMonth() + 1).toString()
              : (dateF.getMonth() + 1).toString();
          const stringDate = `${dateF.getFullYear()}-${stringMonthD}-${stringDateD}`;
          ArrDate.push(stringDate);
        }
      }
      return ArrDate;
    } else {
      const stringDate = `${dateF.getFullYear()}-${
        dateF.getMonth() + 1
      }-${dateF.getDate()}`;
      ArrDate.push(stringDate);
      return ArrDate;
    }
  }
  async getById(id) {
    this.spinnerLoading = true;
    const NotApproved: any = await this.api.httpCall(
      this.api.apiLists.GetAllEventByType + `?type=0`,
      {},
      {},
      'get',
      true
    );
    const Approved: any = await this.api.httpCall(
      this.api.apiLists.GetAllEventByType + `?type=1`,
      {},
      {},
      'get',
      true
    );
    const All = [...NotApproved, ...Approved];
    this.EventComments = All.filter((x) => x.lichtuanid == id)[0];
    this.EventComments.status = false;
    const ArrDate = this.getDateArrChenhLech(
      this.EventComments.tgbatdau.substring(0, 10),
      this.EventComments.tgketthuc.substring(0, 10)
    );
    const arrTam = [];
    const ArrEnd = [];
    if (ArrDate.length > 1) {
      console.log(ArrDate);
      ArrDate.forEach((it) => {
        // console.log(it);
        // e.ngay = it;
        // console.log(e);
        ArrEnd.push({ ...this.EventComments, ngay: it });
      });
      ArrEnd.sort((a, b) => {
        const date1: any = new Date(a.ngay);
        const date2: any = new Date(b.ngay);
        if (date1 != date2) {
          return date1 - date2;
        } else if (
          new Date(a.tgbatdau).getHours() != new Date(b.tgbatdau).getHours()
        ) {
          const hour1: any = new Date(a.tgbatdau).getHours();
          const hour2: any = new Date(b.tgbatdau).getHours();
          return hour1 - hour2;
        } else {
          const minute1: any = new Date(a.tgbatdau).getMinutes();
          const minute2: any = new Date(b.tgbatdau).getMinutes();
          return minute1 - minute2;
        }
      });
    } else {
      const obj = {
        ...this.EventComments,
        ngay: this.EventComments.tgbatdau.substring(0, 10),
      };
      console.log(obj);
      ArrEnd.push(obj);
    }
    this.EventComments = ArrEnd;
    this.getComment(this.EventComments[0].lichtuanid);
    this.spinnerLoading = false;
  }
  repComment(id, noidung, nguoitao) {
    // this.comment.noidung = `<div style="background-Color: RGB(247 243 29); color: red; width:50%; font-size:14px; padding:10px">${noidung}</div>`;
    this.repC.nguoi = nguoitao;
    const stringCutDiv = noidung.substring(5);
    this.repC.noidung =
      noidung.search('<div>') != -1
        ? this.decodeHtmlCharCodes(
            stringCutDiv.substring(0, stringCutDiv.search('</div>'))
          )
        : this.decodeHtmlCharCodes(noidung);
    console.log(stringCutDiv.substring(0, stringCutDiv.search('</div>')));
  }

  async getComment(id) {
    console.log(id);
    this.commentList = await this.api.httpCall(
      this.api.apiLists.GetAllCommentFromIdAndType + `?type=LT` + `&from=${id}`,
      {},
      {},
      'get',
      true
    );
    // this.commentList.forEach((comment) => {
    //   console.log(comment.noiDung.split('\\').join(''));
    //   comment.noiDung = comment.noiDung.split('\\').join('');
    // });
    console.log(this.commentList);
  }
  exitRepComment() {
    this.repC.noidung = '';
    this.repC.nguoi = '';
    this.comment.noidung = '';
  }
  decodeHtmlCharCodes = (str) =>
    str.replace(/(&#(\d+);)/g, (match, capture, charCode) =>
      String.fromCharCode(charCode)
    );
  async addAComment() {
    if (this.comment.noidung) {
      Swal.fire({
        title: '<strong>Bạn chắc chắn muốn phản hồi ?</strong>',
        icon: 'warning',
        html: `Phản hồi gửi đi sẽ không xóa được !`,
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
        reverseButtons: true,
        focusCancel: true,
        cancelButtonText: `Quay lại`,
        confirmButtonText: `Gửi`,
      }).then(async (result) => {
        if (result.value) {
          const newDateEnd = new Date(
            new Date().getFullYear(),
            new Date().getMonth(),
            new Date().getDate(),
            new Date().getHours(),
            new Date().getMinutes()
          );
          const temp2 = dateFormat(newDateEnd, 'isoDateTime');
          console.log(this.comment.noidung, this.repC.noidung);
          let string = !this.repC.noidung
            ? this.comment.noidung
            : '<div>' +
              this.decodeHtmlCharCodes(this.comment.noidung) +
              '</div><div style="border: 2px solid black; padding:10px; margin:10px 0 5px 2%">' +
              '<div>Trích dẫn từ: <span style="font-weight:bold; font-size:15px">' +
              '<b>' +
              this.repC.nguoi +
              '</b>' +
              '</span> </div><div>' +
              this.decodeHtmlCharCodes(this.repC.noidung) +
              '</div></div>';
          console.log(string);

          try {
            await this.api.httpCall(
              this.api.apiLists.addComment,
              {},
              {
                fromID: this.EventComments[0].lichtuanid,
                loaiCMT: 'LT',
                noiDung: string,
                ngayTao: temp2.substring(0, 19),
              },
              'post',
              true
            );
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Phản hồi Thành Công',
              showConfirmButton: false,
              timer: 1000,
            });
          } catch (e) {
            console.log(e);
          }
        }

        this.repC.noidung = '';
        this.repC.nguoi = '';
        this.getComment(this.EventComments[0].lichtuanid);
        this.comment.noidung = '';
        console.log(this.commentList);
      });
    } else {
      Swal.fire({
        title: '<strong>Nội dung phản hồi trống ?</strong>',
        icon: 'warning',
        html: `Bạn chưa nhập phản hồi !`,
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
        reverseButtons: true,
        focusCancel: true,
        cancelButtonText: `Quay lại`,
        confirmButtonText: `Nhập Lại`,
      }).then(async (result) => {});
      this.repC.noidung = '';
      this.repC.nguoi = '';
      this.comment.noidung = '';
    }

    // if (this.taskHistory.noiDung !== "" && this.taskHistory.noiDung !== undefined) {
    //   this.taskHistory.mscv = this.TaskDetail.mscv;
    //   this.taskHistory.danhSachNguoiXuLyKeTiepHoTen = "";
    //   this.taskHistory.nguoiPhanHoi = this.generalService.userData.userID;
    //   this.taskHistory.thoiGian = new Date().toISOString();
    //   var res = await this.api.httpCall(this.api.apiLists.AddNewTaskHistory, {}, this.taskHistory, 'post', true);
    //   this.reloadData.emit();
    // }
  }
  checkhuy(string) {
    if (string == '0') {
      return 'none';
    } else return 'line-through';
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

  goBack() {
    this._location.back();
  }
  openNewEvent() {
    this.router.navigate(['/event/new-event']);
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
  getLabel(key) {
    return data[`${this.generalService.currentLanguage.Code}`][`${key}`];
  }

  /// check
  onChangeChecked(check, values) {
    console.log(check, values);
    // if (this.currentTab) {
    //   if (check) {
    //     this.checkListApproved.push(values);
    //   } else {
    //     if (this.checkListApproved.filter((i) => i == values).length > 0) {
    //       const arrTam = this.checkListApproved.filter((i) => i != values);
    //       this.checkListApproved = arrTam;
    //     } else return false;
    //   }
    // } else {
    //   if (check) {
    //     this.checkListNotApproved.push(values);
    //   } else {
    //     if (this.checkListNotApproved.filter((i) => i == values).length > 0) {
    //       const arrTam = this.checkListNotApproved.filter((i) => i != values);
    //       this.checkListNotApproved = arrTam;
    //     } else return false;
    //   }
    // }
    console.log(this.checkListNotApproved);
  }
  selectAll(check, arr) {
    console.log(check, arr);
    // if (check) {
    //   this.checkListApproved = [];
    //   arr.forEach((item) => {
    //     item.status = true;
    //     this.checkListApproved.push(item.lichtuanid);
    //   });
    // }
    check ? (arr.status = true) : (arr.status = false);
    // if (check) {
    //   if (this.currentTab) {
    //     this.checkListApproved = [];
    //     arr.forEach((item) => {
    //       item.status = true;
    //       this.checkListApproved.push(item.lichtuanid);
    //     });
    //   } else {
    //     this.checkListApproved = [];
    //     arr.forEach((item) => {
    //       item.status = true;
    //       this.checkListNotApproved.push(item.lichtuanid);
    //     });
    //   }
    // } else {
    //   this.checkListApproved = [];
    //   arr.forEach((item) => {
    //     item.status = false;
    //   });
    // }
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
        // try {
        //   if (this.currentTab) {
        //     await this.api.httpCall(
        //       this.api.apiLists.AcceptAllEventRequest,
        //       {},
        //       this.checkListApproved,
        //       'post',
        //       true
        //     );
        //     Swal.fire({
        //       position: 'center',
        //       icon: 'success',
        //       title: 'Duyệt lịch Thành Công',
        //       showConfirmButton: false,
        //       timer: 1000,
        //     });
        //   } else {
        //     await this.api.httpCall(
        //       this.api.apiLists.AcceptAllEventRequest,
        //       {},
        //       this.checkListNotApproved,
        //       'post',
        //       true
        //     );
        //     Swal.fire({
        //       position: 'center',
        //       icon: 'success',
        //       title: 'Duyệt lịch Thành Công',
        //       showConfirmButton: false,
        //       timer: 1000,
        //     });
        //   }
        // } catch (e) {
        //   console.log(e);
        // }
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
          this.router.navigate(['/event/event-list']);
        } catch (e) {
          console.log(e);
        }
      }
    });
  }
  async deleteEventMultiple() {
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
          await this.api.httpCall(
            this.api.apiLists.DeleteEvent,
            {},
            this.EventComments[0].lichtuanid,
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
          this.router.navigate(['/event/event-list']);
        } catch (e) {
          console.log(e);
        }
      }
    });
  }
}
