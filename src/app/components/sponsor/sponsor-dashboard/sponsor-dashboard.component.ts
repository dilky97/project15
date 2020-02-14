import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { SponsorService } from 'src/app/services/sponsor.service';
import { Sponsor } from "src/app/models/sponsor.model";

@Component({
  selector: 'app-sponsor-dashboard',
  templateUrl: './sponsor-dashboard.component.html',
  styleUrls: ['./sponsor-dashboard.component.scss']
})
export class SponsorDashboardComponent implements OnInit {

  list:Sponsor[];
  constructor(
    private firestore:AngularFirestore,
    private service:SponsorService
    ) { }
  
  data;
  id = 'HHG0vJGCTBWway00UItl';

  ngOnInit() {
    this.getData();
    localStorage.setItem("id",this.id);

    
    
    // this.service.getsponsors().subscribe(actionArray =>{
    //   this.list = actionArray.map(item =>{
    //     return {
    //       id:item.payload.doc.id,
    //       ...item.payload.doc.data()
    //     } as Sponsor;
    //   })
    // });
    // console.log();
  }

  getData(){  

    this.firestore.collection('sponsors').doc(this.id).valueChanges().subscribe(val=>{
      this.data=val;
      console.log(val);
    })
  //   var data = this.firestore.firestore.collection("sponsors").doc("this.id").get().then(function(doc) {
  //     if (doc.exists) {
  //         this.data = doc.data()
  //         console.log("Document data:", doc.data());
        
  //     } else {
  //         console.log("No such document!");
  //     }
  // }).catch(function(error) {
  //    console.log("Error getting document:", error);
  // });
  
   
  }

}
