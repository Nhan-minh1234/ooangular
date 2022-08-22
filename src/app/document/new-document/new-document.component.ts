import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-new-document',
  templateUrl: './new-document.component.html',
  styleUrls: ['./new-document.component.css']
})
export class NewDocumentComponent implements OnInit {
  fileToUpload
  newDocumentData
  chosenAssigneelList: any[] = [];
  allUserInList
  majorAssignee
  groupKeyChosenIn = 'all'
  constructor(private _location: Location, public generalService: GeneralService) { }

  ngOnInit(): void {
    this.dualListUpdateForAssignee(null)
  }
  handleFileInput(files: FileList) {
    this.fileToUpload = Array.from(files);
    console.log(this.fileToUpload)
  }
  removeFileFromUploadList(index) {
    this.fileToUpload.splice(index, 1);
    const dt = new DataTransfer()
    const input = document.getElementById('fileList') as HTMLInputElement
    const { files } = input

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      if (index !== i)
        dt.items.add(file) // here you exclude the file. thus removing it.
    }

    input.files = dt.files
  }
  onAsigneeGroupChange(e) {
    console.log(this.groupKeyChosenIn);
    if (e == null || this.groupKeyChosenIn == 'all') {
      this.allUserInList = this.generalService.cloneAnything(this.generalService.allUsers);
    }
    else {
      this.allUserInList = this.generalService.allUsersWithGroups[`${this.groupKeyChosenIn}`]
    }
  }
  dualListUpdateForAssignee(newDocument) {
    this.allUserInList = newDocument.leftList;
    this.chosenAssigneelList = newDocument.rightList
    if (this.majorAssignee != null) {
      let check = false;
      for (let i = 0; i < this.chosenAssigneelList.length; ++i) {
        if (this.majorAssignee == this.chosenAssigneelList[i]) { check = true; break; }
      }
      if (!check)
        this.majorAssignee = null
    }
  }
}
//// Chuyển đổi người thực hiện
