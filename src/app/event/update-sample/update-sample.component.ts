import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { WizardComponent } from 'angular-archwizard';
import { GeneralService } from 'src/app/services/general.service';
import { DatePipe } from '@angular/common';
import { ApiservicesService } from 'src/app/services/api.service';
import { EventSample, EventSampleUpdate } from 'src/app/Model/Event_Sample';
import dateFormat, { masks } from 'dateformat';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { setDefaults } from 'sweetalert/typings/modules/options';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-update-sample',
  templateUrl: './update-sample.component.html',
  styleUrls: ['./update-sample.component.css'],
})
export class UpdateSampleComponent implements OnInit {
  @ViewChild(WizardComponent)
  public wizard: WizardComponent;
  checkDiaDiem = false;
  readonlyInput = false;
  inputDiaDiem;
  locationListAll;
  evenSample = new EventSampleUpdate();
  idLichTuanMau;
  dateStart;
  dateEnd;
  hourStart: any;
  hourEnd: any;
  eventSampleDataUpdate;
  name = 'Angular ';
  today = Date.now();
  wizardStep = 0;
  spinnerLoading = false;
  newEventData = {
    start: '',
    end: '',
    description: '',
    location: '',
    invited: '',
    note: '',
    file: [],
  };
  chosenAssigneelList: any[];
  allUserInStep2List;
  majorAssignee;
  groupKeyChosenInStep2 = 'all';
  //Validate
  errors = {
    noidung: '',
    diadiem: '',
    chutri: '',
    thanhphan: '',
  };
  //
  constructor(
    private _location: Location,
    public generalService: GeneralService,
    public api: ApiservicesService,
    public routerAc: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log(this.wizardStep);
    this.idLichTuanMau = this.routerAc.snapshot.params['id'];
    console.log(this.generalService);
    // this.dualListUpdateForAssignee(null);
    this.getListLocationAll(null);
    this.getById(this.routerAc.snapshot.params['id']);
    // Wed, 22 Dec 2021 00:31:25 GMT

    // T4 ngày 22/12/2021
  }

  async getById(id: string) {
    console.log(id);
    try {
      this.eventSampleDataUpdate = await this.api.httpCall(
        this.api.apiLists.GetEventDetailById,
        {},
        { ltid: id },
        'get',
        true
      );
      this.getListLocationAll(this.eventSampleDataUpdate.diadiem);
      this.evenSample.noidung = this.eventSampleDataUpdate.noidung;
      this.evenSample.chutri = this.eventSampleDataUpdate.chutri;
      this.evenSample.chuanbi = this.eventSampleDataUpdate.chuanbi;
      this.evenSample.khachmoi = this.eventSampleDataUpdate.khachmoi;
      this.evenSample.diadiem = this.eventSampleDataUpdate.diadiem;
      this.evenSample.noidung = this.eventSampleDataUpdate.noidung;
      this.evenSample.ghichu = this.eventSampleDataUpdate.ghichu;
      this.evenSample.thanhphan = this.eventSampleDataUpdate.thanhphan;
      console.log(this.eventSampleDataUpdate);
      this.chosenAssigneelList = this.eventSampleDataUpdate.dsLienQuan;
      this.dateStart = this.eventSampleDataUpdate.tgbatdau.substring(0, 10);
      this.hourStart = this.eventSampleDataUpdate.tgbatdau.substring(11, 16);
      this.dateEnd = this.eventSampleDataUpdate.tgketthuc.substring(0, 10);
      this.hourEnd = this.eventSampleDataUpdate.tgketthuc.substring(11, 16);
      console.log(this.chosenAssigneelList);
      this.onAsigneeGroupChange(null, this.chosenAssigneelList);
      // this.onAsigneeGroupChange2(null, 'U0005');
    } catch (e) {
      console.log(e);
    }
  }
  changeLapLai(values: any) {
    this.eventSampleDataUpdate.laplai = values;
  }
  changeDiaDiem(values: any) {
    this.eventSampleDataUpdate.diadiem = values;
    this.inputDiaDiem = '';
    console.log(values);
    values == ''
      ? ((this.readonlyInput = false), (this.checkDiaDiem = false))
      : ((this.readonlyInput = true), (this.checkDiaDiem = true));
  }
  async getListLocationAll(localCheck) {
    try {
      this.locationListAll = await this.api.httpCall(
        this.api.apiLists.GetAllLocations,
        {},
        {},
        'get',
        true
      );
      if (localCheck) {
        this.checkDiaDiem =
          this.locationListAll.filter(
            (location) => location.tenDiaDiem == localCheck
          ).length === 0
            ? false
            : true;
        if (!this.checkDiaDiem) {
          this.inputDiaDiem = localCheck;
        }
      }

      // console.log(this.locationListAll.length);
    } catch (e) {
      console.log(e.message);
    }
  }
  goBack() {
    this._location.back();
  }
  // setDefaults(arr) {
  //   this.chosenAssigneelList = arr;
  // }
  filterItemvsArr(arr1, arr2) {
    const arrtemp = [];
    arr2.forEach((i) => {
      arrtemp.push(arr1.find((item) => item.userId == i.uid));
    });
    return arrtemp;
  }

  onAsigneeGroupChange(e, values) {
    console.log(e);
    if (e == null || this.groupKeyChosenInStep2 == 'all') {
      (this.allUserInStep2List = this.generalService.cloneAnything(
        this.generalService.allUsers
      )),
        console.log(values);
      this.chosenAssigneelList = this.filterItemvsArr(
        this.generalService.cloneAnything(this.generalService.allUsers),
        values
      );
    } else {
      this.allUserInStep2List = this.generalService.allUsersWithGroups[`${e}`];
    }
    if (values) {
    }
  }
  onChange(e: any) {
    this.onAsigneeGroupChange(e, null);
  }
  // onChangeUser(e: any) {
  //   console.log(e);
  // }
  dualListUpdateForAssignee(event) {
    console.log(event);
    if (event) {
      this.allUserInStep2List = event.leftList;
      this.chosenAssigneelList = event.rightList;
    } else {
      this.chosenAssigneelList = [];
    }
    console.log(this.eventSampleDataUpdate);
    console.log(this.chosenAssigneelList);
  }

  removeFile(index) {
    this.newEventData.file.splice(index, 1);
    const dt = new DataTransfer();
    const input = document.getElementById('fileList') as HTMLInputElement;
    const { files } = input;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (index !== i) dt.items.add(file); // here you exclude the file. thus removing it.
    }

    input.files = dt.files;
  }
  handleFileInput(files: FileList) {
    this.newEventData.file = Array.from(files);
    console.log(files);
  }
  wizardGoodToGo(numb) {
    this.wizard.goToStep(numb);
  }
  finish() {}
  async updateEventSample() {
    /// format date time start
    const date = new Date(this.dateStart);
    const hourS = this.hourStart;
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const arrHourS = hourS.split('');
    const hour = Number(hourS.substring(0, 2));
    const minute = Number(
      `${arrHourS[arrHourS.length - 2]}${arrHourS[arrHourS.length - 1]}`
    );
    const newDateStart = new Date(year, month, day, hour, minute);
    const temp = dateFormat(newDateStart, 'isoDateTime');
    const dateTimeFormatter = temp.substring(0, 19);
    ////format date time end
    const date2 = new Date(this.dateEnd);
    const hourS2 = this.hourEnd;
    const year2 = date2.getFullYear();
    const month2 = date2.getMonth();
    const day2 = date2.getDate();
    const arrHour = hourS2.split('');
    const hour2 = Number(hourS2.substring(0, 2));
    const minute2 = Number(
      `${arrHour[arrHour.length - 2]}${arrHour[arrHour.length - 1]}`
    );
    const newDateEnd = new Date(year2, month2, day2, hour2, minute2);
    const temp2 = dateFormat(newDateEnd, 'isoDateTime');
    const dateTimeFormatter2 = temp2.substring(0, 19);
    this.eventSampleDataUpdate.tgbatdau = dateTimeFormatter;
    this.eventSampleDataUpdate.tgketthuc = dateTimeFormatter2;
    const arrUserId = [];
    this.chosenAssigneelList.forEach((i) => {
      arrUserId.push(i.userId);
    });
    this.eventSampleDataUpdate.dsLienQuan = arrUserId;
    this.eventSampleDataUpdate.idLichTuanMau = this.idLichTuanMau;
    this.eventSampleDataUpdate.noidung = this.evenSample.noidung;
    this.eventSampleDataUpdate.chutri = this.evenSample.chutri;
    this.eventSampleDataUpdate.chuanbi = this.evenSample.chuanbi;
    this.eventSampleDataUpdate.khachmoi = this.evenSample.khachmoi;
    this.eventSampleDataUpdate.noidung = this.evenSample.noidung;
    this.eventSampleDataUpdate.ghichu = this.evenSample.ghichu;
    this.eventSampleDataUpdate.thanhphan = this.evenSample.thanhphan;
    this.eventSampleDataUpdate.diadiem = this.inputDiaDiem
      ? this.inputDiaDiem
      : this.eventSampleDataUpdate.diadiem;
    console.log(this.eventSampleDataUpdate);
    if (this.eventSampleDataUpdate.noidung) {
      this.errors.noidung = '';
    }
    if (this.eventSampleDataUpdate.chutri) {
      this.errors.chutri = '';
    }
    if (this.eventSampleDataUpdate.thanhphan) {
      this.errors.thanhphan = '';
    }
    if (this.eventSampleDataUpdate.diadiem) {
      this.errors.diadiem = '';
    }
    if (
      this.eventSampleDataUpdate.diadiem &&
      this.eventSampleDataUpdate.noidung &&
      this.eventSampleDataUpdate.chutri &&
      this.eventSampleDataUpdate.thanhphan
    ) {
      this.errors.chutri =
        this.errors.diadiem =
        this.errors.noidung =
        this.errors.thanhphan =
          '';
      try {
        await this.api.httpCall(
          this.api.apiLists.UpdateEventSample,
          {},
          this.eventSampleDataUpdate,
          'post',
          true
        );
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Sửa Thành Công',
          showConfirmButton: false,
          timer: 1000,
        });
        this.router.navigate([
          `event/new-event-sample/detail/${this.idLichTuanMau}`,
        ]);
      } catch (e) {
        console.log(e);
      }
    } else if (
      new Date(
        newDateStart.getFullYear(),
        newDateStart.getMonth(),
        newDateStart.getDate()
      ) <
        new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          new Date().getDate()
        ) ||
      newDateStart >= newDateEnd
    ) {
      Swal.fire({
        title: '<strong>Ngày Giờ Không Hợp Lệ ?</strong>',
        icon: 'warning',
        html: `Ngày bắt đầu phải lớn hơn ngày hiện tại và nhỏ hơn ngày kết thúc! !`,
        showCloseButton: true,
        focusConfirm: true,
        reverseButtons: true,
        focusCancel: false,
        confirmButtonText: `Hủy`,
      }).then(async (result) => {
        this.chosenAssigneelList = [];
        if (
          !this.evenSample.diadiem &&
          !this.evenSample.noidung &&
          !this.evenSample.chutri &&
          !this.evenSample.thanhphan
        ) {
          this.errors.thanhphan = '';
          this.errors.chutri = '';
          this.errors.noidung = '';
          this.errors.diadiem = '';
        } else {
          if (!this.evenSample.noidung) {
            this.errors.noidung = '';
          }
          if (!this.evenSample.chutri) {
            this.errors.chutri = '';
          }
          if (!this.evenSample.thanhphan) {
            this.errors.thanhphan = '';
          }
          if (!this.evenSample.diadiem) {
            this.errors.diadiem = '';
            this.evenSample.diadiem == '';
          }
          if (!this.inputDiaDiem && this.checkDiaDiem == false) {
            this.errors.diadiem = '';
            this.evenSample.diadiem == '';
          }
        }
      });
    } else {
      Swal.fire({
        title: '<strong>Thiếu Thông Tin ?</strong>',
        icon: 'warning',
        html: `Vui lòng nhập đầy đủ các thông tin bắt buộc ! !`,
        showCloseButton: true,
        focusConfirm: true,
        reverseButtons: true,
        focusCancel: false,
        confirmButtonText: `Hủy`,
      }).then(async (result) => {
        if (
          !this.eventSampleDataUpdate.diadiem &&
          !this.eventSampleDataUpdate.noidung &&
          !this.eventSampleDataUpdate.chutri &&
          !this.eventSampleDataUpdate.thanhphan
        ) {
          this.errors.thanhphan = 'Vui lòng nhập vào ô này !';
          this.errors.chutri = 'Vui lòng nhập vào ô này !';
          this.errors.noidung = 'Vui lòng nhập vào ô này !';
          this.errors.diadiem = 'Vui lòng nhập vào ô này !';
        } else {
          if (!this.eventSampleDataUpdate.noidung) {
            this.errors.noidung = 'Vui lòng nhập vào ô này !';
          }
          if (!this.eventSampleDataUpdate.chutri) {
            this.errors.chutri = 'Vui lòng nhập vào ô này !';
          }
          if (!this.eventSampleDataUpdate.thanhphan) {
            this.errors.thanhphan = 'Vui lòng nhập vào ô này !';
          }
          if (!this.eventSampleDataUpdate.diadiem) {
            this.errors.diadiem = 'Vui lòng nhập vào ô này !';
            this.eventSampleDataUpdate.diadiem == '';
          }
          if (!this.inputDiaDiem && this.checkDiaDiem == false) {
            this.errors.diadiem = 'Vui lòng nhập vào ô này !';
            this.eventSampleDataUpdate.diadiem == '';
          }
        }
      });
    }
  }
}
