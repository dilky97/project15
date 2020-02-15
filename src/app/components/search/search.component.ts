import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";
import * as _ from "lodash";


import { eventData } from "../../models/event-details.model";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  searchTerm : string;
  results:any;
  filteredNames : any[] = [];
  filters = {};

  constructor(private searchStore:AngularFirestore) { }

  ngOnInit() {

    this.searchStore.collection('events',ref=>ref.limit(5)).valueChanges().subscribe(results =>{
      this.results = results;
      this.applyFilter()
    })
   
  }

  private applyFilter(){
    this.filteredNames = _.filter(this.results,_.conforms(this.filters))
  }

  filterName(property: string,rule:string){
    this.filters[property] = val=> val.toLowerCase().includes(rule.toLowerCase())
    this.applyFilter()
  }

  



}
