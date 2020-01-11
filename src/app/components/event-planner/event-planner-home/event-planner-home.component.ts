import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EventPlannerService } from 'src/app/services/event-planner.service';

@Component({
  selector: 'app-event-planner-home',
  templateUrl: './event-planner-home.component.html',
  styleUrls: ['./event-planner-home.component.scss']
})
export class EventPlannerHomeComponent implements OnInit {
  selectedClubId: any;

  constructor(private route: ActivatedRoute, private CreateEventRoute: Router,private ClubIDService: EventPlannerService) { }

  ngOnInit() {
    this.selectedClubId = this.route.snapshot.paramMap.get('id');
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
