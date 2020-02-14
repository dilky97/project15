import { Component, OnInit } from '@angular/core';
import { SponsorService } from 'src/app/services/sponsor.service';
import { Sponsor } from 'src/app/models/sponsor.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { ProposalDetails } from 'src/app/models/proposal-details.model';

@Component({
  selector: 'app-sponsor-list',
  templateUrl: './sponsor-list.component.html',
  styleUrls: ['./sponsor-list.component.scss']
})
export class SponsorListComponent implements OnInit {

  proposalModel:ProposalDetails = {} as ProposalDetails ;


  list:Sponsor[];
  constructor(
    private service:SponsorService,
    private firestore : AngularFirestore,
    private router:Router
    ) { }

  ngOnInit() {
    this.service.getsponsors().subscribe(actionArray =>{
      this.list = actionArray.map(item =>{
        return {
          id:item.payload.doc.id,
          ...item.payload.doc.data()
        } as Sponsor;
      })
    }); 

    this.proposalModel.event = '';
    this.proposalModel.sponsor = '';
    this.proposalModel.sender = '';
    this.proposalModel.doucument = [] as Array<string>;
   


  }

  request(id){
    //need to add relevant sponsorId and relevant eventId to the proposals array 
    //optional - also send the senderId
    this.proposalModel.sponsor=id;
    this.firestore.collection('proposals').add(this.proposalModel).then(doc=>{
      this.router.navigate(['./sponsor-list'])
    })
  }
}
