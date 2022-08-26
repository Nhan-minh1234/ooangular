import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
 
keylabel
  constructor(private router:Router,private activaterouter:ActivatedRoute) { }

  ngOnInit(): void {
   this.activaterouter.params.subscribe(e=>{
    this.keylabel=e['label']
   })
  }

}
