import { Component, OnInit } from '@angular/core';
import { SponsorService } from 'src/app/services/sponsor.service';
import { Sponsor } from 'src/app/models/sponsor.model';

@Component({
  selector: 'app-sponsor-list',
  templateUrl: './sponsor-list.component.html',
  styleUrls: ['./sponsor-list.component.scss']
})
export class SponsorListComponent implements OnInit {

  list:Sponsor[];
  constructor(private service:SponsorService) { }

  ngOnInit() {
    this.service.getsponsors().subscribe(actionArray =>{
      this.list = actionArray.map(item =>{
        return {
          id:item.payload.doc.id,
          ...item.payload.doc.data()
        } as Sponsor;
      })
    }); 
  }

}
