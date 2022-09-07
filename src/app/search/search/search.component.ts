import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { title } from 'process';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  keylabel
  searchdata
  result=[]
  constructor(private router: Router, private activaterouter: ActivatedRoute, private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.activaterouter.params.subscribe(e => {
      this.keylabel = e['label']
    })
    this.getData()
  }

  getData() {
    this.httpClient.get('https://62fde3c541165d66bfb3a622.mockapi.io/api/projectlist').subscribe(x => {
      this.searchdata = x
      this.search(this.keylabel)
      console.log(this.searchdata)
      console.log(this.result)
    })
  }
  search(label) {
    this.searchdata.forEach(element => {
      if(element.name.search(label)>-1){
        this.result.push(element)
      }
    });
  }
}
