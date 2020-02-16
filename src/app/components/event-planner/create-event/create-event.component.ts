import { Component, OnInit, Input } from '@angular/core';
import { Router } from "@angular/router";
import { FormGroup,FormControl, Validators } from "@angular/forms";
import { AngularFirestore } from "@angular/fire/firestore";
import { ToastrService } from "ngx-toastr";
import { NgbDateStruct,NgbCalendar ,NgbDatepickerConfig,NgbDateParserFormatter } from "@ng-bootstrap/ng-bootstrap";

import { EventPlannerService } from "../../../services/event-planner.service";
import { ClubDetailsService } from "../../../services/club-details.service";

import { ClubDetails } from 'src/app/models/club-details.model';
import { eventData } from "src/app/models/event-details.model";
import { ThrowStmt } from '@angular/compiler';


@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})

export class CreateEventComponent implements OnInit {

  data: any;
  selectedClubId: string;
  returnedId: string;
  loggedInClub : ClubDetails = {} as ClubDetails;
  newEvent : eventData = {} as eventData;

  minDate = undefined;
  dateModel: NgbDateStruct;
  date: {day: number, month: number,year:number};
  startDateStr : string;
  endDateStr : string;

  CreateEventForm = new FormGroup({
    clubId: new FormControl(),
    eventName: new FormControl('', [ Validators.required ]),
    startDate: new FormControl(),
    endDate: new FormControl(),
    startTime: new FormControl(),
    endTime: new FormControl(),
    venue: new FormControl(),
    description: new FormControl()
  });

  //eventItem : eventData  = new eventData();
  //submitted = false;

  constructor(
    public eventService: EventPlannerService, 
    private clubIDService : EventPlannerService, 
    private clubDataService : ClubDetailsService,

    private dbstore: AngularFirestore,
    private toastr: ToastrService,
    private router: Router,
    private dateConfig : NgbDatepickerConfig,
    private calendar: NgbCalendar,
    private parseFormatter : NgbDateParserFormatter) {

      const currDate = new Date();
      this.minDate = {
        year: currDate.getFullYear(),
        month: currDate.getMonth() + 1,
        day: currDate.getDate()
      };

    }

  ngOnInit() {

    this.selectedClubId = this.clubIDService.getClubId();
    //this.resetForm();
  }
  async createEventSubmit(formData) {

    let DELIMITER = '-';

    this.startDateStr = this.parseFormatter.format(formData.startDate);

    this.endDateStr = this.parseFormatter.format(formData.endDate);
    

    this.newEvent.clubID = this.selectedClubId;
    this.newEvent.eventName = formData.eventName;
    this.newEvent.startDate = this.startDateStr;
    this.newEvent.endDate = this.endDateStr;
    this.newEvent.startTime = formData.startTime;
    this.newEvent.endTime = formData.endTime;
    this.newEvent.venue = formData.venue;
    this.newEvent.description = formData.description;

    this.newEvent.startTimeStamp = new Date(this.newEvent.startDate).getTime();
    this.newEvent.endTimeStamp = new Date(this.newEvent.endDate).getTime();
    this.newEvent.image = "https://www.stlucianewsonline.com/wp-content/uploads/2019/05/hackathon-1024x575.png";
    this.newEvent.status = 0;
    this.newEvent.registeredStudents = [] as Array<string>;
    this.newEvent.participatedStudent = [] as Array<string>;


    await this.eventService.createEventDatabase(this.newEvent).then(
      resDb => {
        this.returnedId = resDb.id;
        console.log(this.returnedId);
      }
    );

    this.loggedInClub = (await this.dbstore.firestore.collection('clubs').doc(this.selectedClubId).get()).data() as ClubDetails;
    // console.log(this.loggedInClub);
    console.log(this.returnedId);

    this.loggedInClub.events.push(this.returnedId);
    // console.log(this.loggedInClub);
    this.dbstore.collection('clubs').doc(this.selectedClubId).update(this.loggedInClub);


    this.newEvent.id = this.returnedId;
    if(this.dbstore.collection('events').doc(this.returnedId).update(this.newEvent)){
      this.toastr.success('Submitted Successfully', 'Event Created');
    }
    else{
      this.toastr.error('Error! Event Creation Failed');
    };


    // this.router.navigate(['/event-planner-home',this.selectedClubId,'event', this.returnedId]);


    this.router.navigate(['/event-planner-home',this.selectedClubId]);

  }


  selectToday(){
    this.dateModel = this.calendar.getToday();
  }

  // resetForm(form?: NgForm) {
  //   if (form != null) {
  //     form.resetForm();
  //   }
  //   this.eventService.eventInfo = {
  //     id: null,
  //     eventName: '',
  //     startDate: '',
  //     endDate: '',
  //     startTime: '',
  //     endTime: '',
  //     venue: '',
  //     description: '',
  //     clubID: this.selectedClubId,
  //   };

//   }

//     async onSubmit(form: NgForm) {
//       this.data = Object.assign({}, form.value);
//       delete this.data.id;
//       if (form.value.id == null) {
//         this.dbstore.collection('events').add(this.data);
//       } else {
//         this.dbstore.doc('events/' + form.value.id).update(this.data);
//       }
//       this.resetForm(form);
//       this.toastr.success('Submitted Successfully', 'Event Created');
//       this.router.navigate(['/event-planner-home', this.selectedClubId]);
// ;
//     }
}


