import { Component, OnInit } from '@angular/core';
import { UserDetailsService } from 'src/app/services/user-details.service';
import { StudentDetails } from 'src/app/models/student-details.model';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import { EventDetailsService } from 'src/app/services/event-details.service';
import { EventDetails } from 'src/app/models/event-details.model';

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
  allEventList: EventDetails[] = [] as EventDetails[];
  participatingEventList: EventDetails[] = [] as EventDetails[];

  studentObservable: Observable<StudentDetails>;

  ngOnInit() {

    firebase.auth().onAuthStateChanged( user => {
      if (user) {
        if (user.displayName === 'student') {

          this.studentObservable = this.studentDetailsService.readStudentDatabase( user.uid ) as Observable<StudentDetails> ;

          this.studentObservable.subscribe( temp => {

            this.student = temp as StudentDetails ;

            console.log(this.student);

            this.getParticipatingEvents(this.student.participatingEvents);

          });

        } else {
          this.router.navigate(['/no-access']);
        }
      } else {
        this.router.navigate(['/home']);
      }
    });

    this.eventDetails.getAllEvents().subscribe( actionArray => {

      this.allEventList = actionArray.map( item => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data()
        } as EventDetails ;
      });

    });

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


