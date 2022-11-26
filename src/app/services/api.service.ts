import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { GeneralService } from './general.service';
import { timeout, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiservicesService {
  apiLists = {
    login: '/api/Users/token',
    getUserByID: '/api/Users/GetUserByUserId/',
    getAllUsers: '/api/Users/GetAllUsers',
    updateUserInfo: '/api/Users/UpdateUser',
    getTasks: '/api/Tasks/GetAllTasks/',
    getTaskDetail: '/api/Tasks/GetTaskDetail/',
    createNewTask: '/api/Tasks/CreateNewTask',
    getAllUserGroups: '/api/Groups/GetAllGroups',
    uploadFile: '/api/File/Upload?subDirectory=',
    downloadFile: '/api/File/Download',
    GetAllTasksCategoryByUserId: '/api/Tasks/GetAllTasksCategoryByUserId',
    UpdateTaskTitle: '/api/Tasks/UpdateTaskTitle',
    AddCategoryToTask: '/api/Tasks/AddCategoryToTask',
    AssignNewParticipantToTask: '/api/Tasks/AssignNewParticipantToTask',
    AssignNewViewerToTask: '/api/Tasks/AssignNewViewerToTask',
    DelayTask: '/api/Tasks/DelayTask',
    AssignNewListParticipantToTask: '/api/Tasks/AssignNewListParticipantToTask',
    AssignNewListViewerToTask: '/api/Tasks/AssignNewListViewerToTask',
    FollowATask: '/api​/Tasks​/FollowATask',
    ChangeMajorAssignment: '/api/Tasks/ChangeMajorAssignment',
    RequestFinishATask: '/api/Tasks/RequestFinishATask',
    FinishATask: '/api/Tasks/FinishATask',
    AddNewTaskHistory: '/api/Tasks/AddNewTaskHistory',
    GetAllTasksProject: '/api/Tasks/GetAllTasksProject'
  }

  constructor(private httpClient: HttpClient, private router: Router, private generalService: GeneralService) {
  }
  defaultTimeout = 10000
  postFile(fileToUpload: [File], url, header, taskID, showErr) {
    url = this.generalService.appConfig.API_BASE_URL + url + `${taskID}%2F${this.generalService.currentUser.userId}`;
    if (this.generalService.userData != null) {
      header['Authorization'] = 'Bearer ' + this.generalService.userData.token;
      header['enctype'] = 'multipart/form-data';
    }
    const formData: FormData = new FormData();
    fileToUpload.forEach(file => {
      formData.append('formFiles', file, file.name);
    })
    return new Promise((resolve, reject) => {
      this.httpClient.post(url, formData, { headers: header }).subscribe(res => {
        console.log(res);
        resolve(res);
      }, (err) => {
        console.log(err)
        if (showErr)
          this.generalService.showErrorToast(0, 'Đã xảy ra lỗi kết nối với hệ thống. Xin vui lòng thử lại.')
        reject(err);
      });
    });

  }
  httpCall(url, header, body, method, showErr) {
    url = this.generalService.appConfig.API_BASE_URL + url;
    if (this.generalService.userData != null) {
      header['Authorization'] = 'Bearer ' + this.generalService.userData.token;
    }
    return new Promise((resolve, reject) => {
      //use angular http        
      if (method == 'get') {
        this.httpClient.get(url, { headers: header, params: body })
          .pipe(
            timeout(this.defaultTimeout),
            catchError(e => {
              return Promise.reject('TimeOut');;
            })
          )
          .subscribe(res => {
            console.log(res);
            resolve(res);
          }, (err) => {
            console.log(err)
            if (showErr)
              this.generalService.showErrorToast(0, 'Đã xảy ra lỗi kết nối với hệ thống. Xin vui lòng thử lại.')
            reject(err);
          });
      }
      else if (method == 'post') {
        this.httpClient.post(url, body, { headers: header })
          .pipe(
            timeout(this.defaultTimeout),
            catchError(e => {
              return Promise.reject('TimeOut');;
            })
          )
          .subscribe(res => {
            console.log(res);
            resolve(res);
          }, (err) => {
            console.log(err)
            if (showErr)
              this.generalService.showErrorToast(0, 'Đã xảy ra lỗi kết nối với hệ thống. Xin vui lòng thử lại.')
            reject(err);
          });
      }
      else if (method == 'patch') {
        this.httpClient.patch(url, body, { headers: header })
          .pipe(
            timeout(this.defaultTimeout),
            catchError(e => {
              return Promise.reject('TimeOut');;
            })
          )
          .subscribe(res => {
            console.log(res);
            resolve(res);
          }, (err) => {
            console.log(err)
            if (showErr)
              this.generalService.showErrorToast(0, 'Đã xảy ra lỗi kết nối với hệ thống. Xin vui lòng thử lại.')
            reject(err);
          });
      }
      else if (method == 'put') {
        this.httpClient.put(url, body, { headers: header })
          .pipe(
            timeout(this.defaultTimeout),
            catchError(e => {
              return Promise.reject('TimeOut');;
            })
          )
          .subscribe(res => {
            console.log(res);
            resolve(res);
          }, (err) => {
            console.log(err)
            if (showErr)
              this.generalService.showErrorToast(0, 'Đã xảy ra lỗi kết nối với hệ thống. Xin vui lòng thử lại.')
            reject(err);
          });
      }
      else if (method == 'delete') {
        this.httpClient.delete(url, { headers: header })
          .pipe(
            timeout(this.defaultTimeout),
            catchError(e => {
              return Promise.reject('TimeOut');;
            })
          )
          .subscribe(res => {
            console.log(res);
            resolve(res);
          }, (err) => {
            console.log(err)
            if (showErr)
              this.generalService.showErrorToast(0, 'Đã xảy ra lỗi kết nối với hệ thống. Xin vui lòng thử lại.')
            reject(err);
          });
      }
    });
  }


  async initDataFromServer() {
    this.getUserInfo();
    this.getAllUsers(null, null);
  }

  async getUserInfo() {
    try {
      let res = await this.httpCall(this.apiLists.getUserByID + this.generalService.userData.userID, {}, {}, 'get', false)
      let result = <any>res
      if (result.succeeded) {
        this.generalService.currentUser = result.data;
      }
    } catch (error) {

    }
  }

  async getAllUsers(pageNum, pageSize) {
    try {
      if (pageNum == null || pageSize == null) {
        pageNum = 1; pageSize = 200;
      }
      let res = await this.httpCall(this.apiLists.getAllUsers, {}, {
        PageNumber: pageNum, PageSize: pageSize
      }, 'get', false)
      let result = <any>res
      if (result.succeeded) {
        this.generalService.allUsers = result.data;
        this.generalService.allUsersWithGroups = this.generalService.groupByKey(result.data, 'groupChinhName')
        this.generalService.allUserGroupsKey = Object.keys(this.generalService.allUsersWithGroups)
      }
    } catch (error) {

    }
  }


}
