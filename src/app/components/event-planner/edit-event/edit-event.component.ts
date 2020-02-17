import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";
import { FormGroup, FormControl,FormBuilder } from '@angular/forms';
import { ToastrService } from "ngx-toastr";
import { NgbDateStruct,NgbCalendar ,NgbDatepickerConfig, NgbDateParserFormatter } from "@ng-bootstrap/ng-bootstrap";


import { Observable } from "rxjs";
import { EventPlannerService } from "../../../services/event-planner.service";
import { eventData } from "../../../models/event-details.model";
import { NgbTypeaheadWindow } from '@ng-bootstrap/ng-bootstrap/typeahead/typeahead-window';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.scss']
})
export class EditEventComponent implements OnInit {

  currentEventId : string;
  currentEventObservable : Observable<eventData>;
  currentEventData : eventData;
  editEvent : eventData = {} as eventData;
  returnedId : string;

  minDate = undefined;
  dateModel: NgbDateStruct;
  date: {day: number, month: number,year:number};
  startDateStr : string;
  endDateStr : string;

  editEventForm = new FormGroup({
    clubID: new FormControl(),
    eventName: new FormControl(),
    startDate: new FormControl(),
    endDate: new FormControl(),
    startTime: new FormControl(),
    endTime: new FormControl(),
    venue: new FormControl(),
    description: new FormControl(),
  });

  constructor(private eventStore: AngularFirestore,
    private eventService:EventPlannerService,
    private editBuilder:FormBuilder,
    private toastr:ToastrService,
    private dateConfig : NgbDatepickerConfig,
    private calendar: NgbCalendar,
    private parseFormatter : NgbDateParserFormatter) {

    this.currentEventId = localStorage.getItem("curEventId");
    this.currentEventObservable = this.eventService.getEvent(this.currentEventId) as Observable<eventData>;

    const currDate = new Date();
      this.minDate = {
        year: currDate.getFullYear(),
        month: currDate.getMonth() + 1,
        day: currDate.getDate()
      };
  }

  ngOnInit() {

    this.currentEventObservable.subscribe(res=>{
      this.currentEventData = res;
      console.log(this.currentEventData);
      this.setDefault(this.currentEventData);
    })


  }

  setDefault(currentEventData){
    let defaultVal = {
      clubID: this.currentEventData.clubID,
      eventName: this.currentEventData.eventName,
      startDate: this.parseFormatter.parse(this.currentEventData.startDate),
      endDate: this.parseFormatter.parse(this.currentEventData.endDate),
      startTime: this.currentEventData.startTime,
      endTime: this.currentEventData.endTime,
      venue: this.currentEventData.venue,
      description: this.currentEventData.description
    };

    console.log(defaultVal);

    this.editEventForm = this.editBuilder.group(defaultVal);
  }

  onSubmit() {

    this.editEvent = this.editEventForm.value;

    console.log(this.editEvent);

    this.startDateStr = this.parseFormatter.format(this.editEvent.startDate);
    this.endDateStr = this.parseFormatter.format(this.editEvent.endDate);

    this.editEvent.startDate = this.startDateStr;
    this.editEvent.endDate = this.endDateStr;

    console.log(this.editEvent);

    if(this.eventService.updateEvent(this.currentEventId,this.editEvent)){
      this.toastr.success("Updated Successfully");
    }
    else{
      this.toastr.error("Update Failed");
    };





    // console.log(this.editEvent);


  }


}
