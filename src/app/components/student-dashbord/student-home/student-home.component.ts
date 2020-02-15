import { Component, OnInit } from '@angular/core';
import { UserDetailsService } from 'src/app/services/user-details.service';
import { StudentDetails } from 'src/app/models/student-details.model';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import { EventDetailsService } from 'src/app/services/event-details.service';
import { eventData } from 'src/app/models/event-details.model';

@Component({
  selector: 'app-student-home',
  templateUrl: './student-home.component.html',
  styleUrls: ['./student-home.component.scss']
})
export class StudentHomeComponent implements OnInit {

  constructor(
               private studentDetailsService: UserDetailsService,
               public router: Router,
               private eventDetails: EventDetailsService
             ) { }

  student: StudentDetails = {} as StudentDetails;
  allEventList: eventData[] = [] as eventData[];
  participatingEventList: eventData[] = [] as eventData[];

  studentObservable: Observable<StudentDetails>;

  profilePicture = '../../../../assets/images/account/Account.png';

  ngOnInit() {

    if (JSON.parse(localStorage.getItem('user'))) {

      if ( localStorage.getItem('displayName') === 'student' ) {
        this.student = JSON.parse(localStorage.getItem('user')) as StudentDetails ;
      }

      if ( localStorage.getItem('profilePicture') !== 'null' ) {
        this.profilePicture = localStorage.getItem('profilePicture');
      }

      this.eventDetails.getAllEvents().subscribe( actionArray => {
        this.allEventList = actionArray as unknown as eventData[] ;
        this.getParticipatingEvents(this.student.participatingEvents);
      });

    } else {
      this.router.navigate(['/no-access']);
    }

  }

  getParticipatingEvents(participatingEventIds: Array<string>) {
    this.allEventList.forEach(element => {
      if (participatingEventIds.includes(element.id)) {
        this.participatingEventList.push(element);
      }
    });
  }

  openEvent(id) {
    this.router.navigate(['/events' , id]);
  }

}


