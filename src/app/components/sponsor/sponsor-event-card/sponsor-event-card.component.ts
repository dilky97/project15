import { Component, OnInit, Input } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Sponsor } from "src/app/models/sponsor.model";

@Component({
  selector: 'app-sponsor-event-card',
  templateUrl: './sponsor-event-card.component.html',
  styleUrls: ['./sponsor-event-card.component.scss']
})
export class SponsorEventCardComponent implements OnInit {

  spoId;

  constructor(private firestore:AngularFirestore) {
    this.spoId = localStorage.getItem("spoId");
   }

  @Input('eventId') eventId;

  ngOnInit() {
    this.getevent();
  }
  eventdata;
 
  

  getevent(){  

    this.firestore.collection('events').doc(this.eventId).valueChanges().subscribe(eventdata=>{
      this.eventdata=eventdata;
    
    });
  } 

  // showInterestedd(){
  //   var arr;
  //   this.
  //   console.log(arr);

  //   this.firestore.collection("proposal").where("event", "==", ).subscribe(a=>{
  //     id=a.id;
      
  //     this.firestore.collection("sponsors").doc(sponsorid).get().subscribe(c=>{
  //       arr=c.data().receivedProposals;
  //       // arr.push(id)

  //       //remove id from receivedProposals array
  //       this.firestore.collection("spo").doc(this.spoId).update({receivedProposals:arr}).then(a=>{
          
  //       });

  //     })
  //   })

  //   // arr.push(id)

  // }

  reject(){
    var proId;
    var arr = [];
    var newarr = []=[];
    // if(confirm("Are you sure to reject this event?")){
    //   this.firestore.collection("sponsors").doc(this.spoId).update({receivedProposals:firestore.FieldValue.arrayRemove()});
    // }
    this.firestore.collection("proposals",ref=>ref.where('event', '==', this.eventId)).valueChanges().subscribe(a=>{
      proId=a[0]["proposalId"];

      console.log("a " +a[0]['proposalId']);
      console.log("proId " +proId);
      
      this.firestore.collection("sponsors").doc(this.spoId).get().subscribe(c=>{
        arr=c.data().receivedProposals;

        arr.forEach(element => {
          console.log("element " +element)
          if(element!=proId){
            newarr.push(element)
          }
        });

        console.log("this is newarr " +newarr)
        //remove id from receivedProposals array
        this.firestore.collection("sponsors").doc(this.spoId).update({receivedProposals:newarr});

        

      })
    })
  }

}
