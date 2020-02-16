import { Component, OnInit } from '@angular/core';
import { AdvisorDetails } from 'src/app/models/advisor-details.model';
import { ClubDetails } from 'src/app/models/club-details.model';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import { eventData } from 'src/app/models/event-details.model';

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

  selectedClubName: string;

  newRequestFlag: boolean;

  ngOnInit() {
    if (JSON.parse(localStorage.getItem('user'))) {

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
    console.log(this.showingNewClubRequest);
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

    }
  }

  openEvent(id) {
    this.router.navigate(['/events' , id]);
  }

}
