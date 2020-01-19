import { Component, OnInit } from '@angular/core';
import { EventPlannerService } from "../../../services/event-planner.service";
//import { eventData } from "../app.model";
import { NgForm } from "@angular/forms";
import { AngularFirestore } from "@angular/fire/firestore";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit {


  data: any;

  //eventItem : eventData  = new eventData();
  //submitted = false;

  constructor(public eventService: EventPlannerService, private dbstore: AngularFirestore, private toastr: ToastrService) {}

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null) {
      form.resetForm();
    }
    this.eventService.eventInfo = {
      id: null,
      eventName: '',
      startDate: '',
      endDate: '',
      startTime: '',
      endTime: '',
      venue: '',
      description: '',
    };

  }

    onSubmit(form: NgForm) {
      this.data = Object.assign({}, form.value);
      delete this.data.id;
      if (form.value.id == null) {
        this.dbstore.collection('events').add(this.data);
      } else {
        this.dbstore.doc('events/' + form.value.id).update(this.data);
      }
      this.resetForm(form);
      this.toastr.success('Submitted Successfully', 'Event Created');
    }
}

  // newEvent(): void{
  //   this.submitted = false;
  //   this.eventItem = new eventData();
  // }

  // addEvent(){
  //   this.eventService.createEvent(this.eventItem);
  //   this.eventItem = new eventData();
  // }

  // onSubmitCreateEvent(){
  //   this.submitted = true;
  //   this.addEvent();
  // }


