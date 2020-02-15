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
  sponsorModel:Sponsor = {} as Sponsor;

  list:Sponsor[];
  constructor(
    private service:SponsorService,
    private firestore : AngularFirestore,
    private router:Router
    ) {
      // this.id = localStorage.getItem("eid");
     }

  eid = "dbtfMUuefHSQkdam0zJ0";

  ngOnInit() {
    
      this.firestore.collection("events").doc(this.eid).get().subscribe(data=>{
        var already=data.data().requestedSponsors;
        this.service.getsponsors().subscribe(actionArray =>{
          this.list = actionArray.map(item =>{
            return {
              id:item.payload.doc.id,
              status:true,
              ...item.payload.doc.data()
            } as Sponsor;  
          })
          for(var j=0;j<this.list.length;j++){
            for(var i=0;i<already.length;i++){
              if(already[i] ==this.list[j].id){
                this.list[j].status=false;

              }
            }
          }
          })
      })
    // }); 

    this.proposalModel.event = '';
    this.proposalModel.sponsor = '';
    this.proposalModel.sender = '';
    this.proposalModel.doucument = [] as Array<string>;
   


  }

  request(id){
    //need to add relevant sponsorId and relevant eventId to the proposals array 
    //optional - also send the senderId
    this.proposalModel.sponsor=id;
    this.proposalModel.event=this.eid;
    this.firestore.collection('proposals').add(this.proposalModel).then(doc=>{
      this.firestore.collection('sponsors').doc(id).get().subscribe(data=>{
        var arr=data.data().receivedProposals;
        arr.push(doc.id);
        this.firestore.collection("sponsors").doc(id).update({receivedProposals:arr}).then(b=>{
          this.firestore.collection('events').doc(this.eid).get().subscribe(d=>{
            var ab=d.data().requestedSponsors;
            ab.push(id);
            this.firestore.collection("events").doc(this.eid).update({requestedSponsors:ab});
          })
        });        
      })
      doc.id
      this.router.navigate(['./sponsor-list'])
    })
  }
}