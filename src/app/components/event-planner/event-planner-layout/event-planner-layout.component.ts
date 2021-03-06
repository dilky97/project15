import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-event-planner-layout',
  templateUrl: './event-planner-layout.component.html',
  styleUrls: ['./event-planner-layout.component.scss']
})
export class EventPlannerLayoutComponent implements OnInit {

  currentEventID: string;

  constructor() { }

  ngOnInit() {
    this.currentEventID = localStorage.getItem("curEventId");
  }

}
