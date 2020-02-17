import { Component, OnInit } from '@angular/core';
import { AdvisorDetails } from 'src/app/models/advisor-details.model';
import { ClubDetails } from 'src/app/models/club-details.model';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import { eventData } from 'src/app/models/event-details.model';
import { StudentDetails } from 'src/app/models/student-details.model';

@Component({
  selector: 'app-advisor-home',
  templateUrl: './advisor-home.component.html',
  styleUrls: ['./advisor-home.component.scss']
})
export class AdvisorHomeComponent implements OnInit {

  constructor(
               public router: Router,
             ) { }

  advisor: AdvisorDetails = {} as AdvisorDetails;
  newClubRequests: ClubDetails[] = [] as ClubDetails[];
  profilePicture = '../../../../assets/images/account/Account.png';

  showingEventlist: eventData[] = [] as eventData[];

  showingNewClubRequest: ClubDetails = {} as ClubDetails;
  deletingClub: ClubDetails = {} as ClubDetails;

  selectedClubName: string;

  newRequestFlag: boolean;

  eventPlanner: StudentDetails = {} as StudentDetails;
  eventPlannerId: string;

  president: StudentDetails = {} as StudentDetails;
  presidentId: string;


  x =  [{id:5, name: 'priya'}, {id:7, name: 'jaya'}, {id:10, name: 'sanka'}];

  ngOnInit() {

    console.log(this.x);
    console.log(this.x.findIndex(i => i.id === 10));
    this.x.splice(this.x.findIndex(i => i.id === 10), 1);
    console.log(this.x);




    if ( localStorage.getItem('displayName')) {

      if ( localStorage.getItem('displayName') === 'advisor' ) {
        this.advisor = JSON.parse(localStorage.getItem('user')) as AdvisorDetails ;
      }

      console.log(this.advisor);

      if ( localStorage.getItem('profilePicture') !== 'null' ) {
        this.profilePicture = localStorage.getItem('profilePicture');
      }

      if (this.advisor.advisorIn.length > 0 ) {
        this.setShowingEvents(this.advisor.advisorIn[0].id, this.advisor.advisorIn[0].name);
      } else {
        this.selectedClubName = 'You are not a advisor in any Club';
      }

    } else {
      this.router.navigate(['/no-access']);
    }
  }

  setShowingEvents(id, name) {
    this.newRequestFlag = false;
    this.showingEventlist = [] as eventData[] ;
    this.selectedClubName = name;
    const promise = firebase.firestore().collection('events').where( 'clubID', '==', id ).get();
    promise.then( async res => {
      res.forEach( doc => {
        this.showingEventlist.push(doc.data() as eventData);
      });
    });
    console.log(this.showingEventlist);
  }

  setShowinNewClubRequest(id, name) {
    this.newRequestFlag = true;
    const promise = firebase.firestore().collection('clubs').doc(id).get();
    promise.then( async res => {
      this.showingNewClubRequest = res.data() as ClubDetails;
    });
  }

  async response(accept, id) {
    if (accept) {
      await firebase.firestore().collection('clubs').doc(id).update({isActivated: true});
      const index = this.advisor.newClubRequests.findIndex(i => i.id === id);
      this.advisor.advisorIn.push(this.advisor.newClubRequests[index]);
      this.advisor.newClubRequests.splice(index, 1);
      localStorage.setItem('user', JSON.stringify(this.advisor));
      firebase.firestore().collection('advisors').doc(localStorage.getItem('uid')).update(this.advisor);
      this.setShowingEvents(this.advisor.advisorIn[0].id, this.advisor.advisorIn[0].name);
    } else {
      console.log('started');
      const index = this.advisor.newClubRequests.findIndex(i => i.id === id);
      this.advisor.newClubRequests.splice(index, 1);
      localStorage.setItem('user', JSON.stringify(this.advisor));
      await firebase.firestore().collection('advisors').doc(localStorage.getItem('uid')).update(this.advisor);

      const promise = firebase.firestore().collection('clubs').doc(id).get();
      await promise.then( async res => {

        this.deletingClub = res.data() as ClubDetails;
        console.log('took deleteing club');
        console.log(this.deletingClub);

        // delete club from eventPlanner
        const promise1 = firebase.firestore().collection('students').where( 'email', '==', this.deletingClub.eventPlanner ).get();
        await promise1.then( res1 => {
          res1.forEach( doc => {
            this.eventPlanner = doc.data() as StudentDetails;
            this.eventPlannerId = doc.id;
            console.log('event planner found');
            console.log(this.eventPlanner);
          });
          const index1 = this.eventPlanner.eventPlannerIn.findIndex( i => i.id === id );
          console.log(index1);
          this.eventPlanner.eventPlannerIn.splice(index1, 1);
          console.log(this.eventPlanner);
          firebase.firestore().collection('students').doc(this.eventPlannerId).update(this.eventPlanner).then(
            rese => {
              console.log('removed from event palnner');
            }
          );
        });

        // delete club from president
        const promise2 = firebase.firestore().collection('students').where( 'email', '==', this.deletingClub.president ).get();
        await promise2.then( res1 => {
          res1.forEach( doc => {
            this.president = doc.data() as StudentDetails;
            this.presidentId = doc.id;
            console.log('president found');
            console.log(this.president);
          });
          const index2 = this.president.presidentIn.findIndex(i => i.id === id );
          console.log(index2);
          this.president.presidentIn.splice(index2, 1);
          console.log(this.president);
          firebase.firestore().collection('students').doc(this.presidentId).update(this.president).then(
            rese => {
              console.log('removed from president');
            }
          );
        });

      });
      await firebase.firestore().collection('clubs').doc(id).delete();
      this.setShowingEvents(this.advisor.advisorIn[0].id, this.advisor.advisorIn[0].name);
    }
  }

  openEvent(id) {
    this.router.navigate(['/events' , id]);
  }

}
