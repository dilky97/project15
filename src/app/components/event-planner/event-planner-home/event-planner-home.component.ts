import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from "rxjs";
import { EventPlannerService } from 'src/app/services/event-planner.service';
import { ClubDetailsService } from "src/app/services/club-details.service";
import { ClubDetails } from "src/app/models/club-details.model";

@Component({
  selector: 'app-event-planner-home',
  templateUrl: './event-planner-home.component.html',
  styleUrls: ['./event-planner-home.component.scss']
})
export class EventPlannerHomeComponent implements OnInit {
  selectedClubId: any;
  club: ClubDetails = {} as ClubDetails;

  clubObservable : Observable<ClubDetails>;

  constructor(private route: ActivatedRoute, private CreateEventRoute: Router,private ClubIDService: EventPlannerService,private ClubDataService:ClubDetailsService) {
    this.selectedClubId = this.route.snapshot.paramMap.get('id');
    localStorage.setItem("cludId",this.selectedClubId);
    console.log(localStorage.getItem("cludId"));
  }

  ngOnInit() {
    // this.selectedClubId = this.route.snapshot.paramMap.get('id');

    console.log(this.selectedClubId);

    this.clubObservable = this.ClubDataService.readClubDatabase(this.selectedClubId) as Observable<ClubDetails> ;

    this.clubObservable.subscribe( tempClub => {

      this.club = tempClub as ClubDetails ;

      console.log(this.club);

      localStorage.setItem("cludId",this.selectedClubId);
      console.log(localStorage.getItem("cludId"));

    });

  }

  public goToCreateEvent(){
    this.CreateEventRoute.navigate(['event-planner-home',this.selectedClubId,'create-event']).then( (e)=>{
      if (e) {
        console.log(this.selectedClubId);
        this.ClubIDService.saveClubId(this.selectedClubId);
      }
      else{
        console.log("Failed");
      }
    });

  }

}
