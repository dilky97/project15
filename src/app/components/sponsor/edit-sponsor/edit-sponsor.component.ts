import { Component, OnInit } from '@angular/core';
import { AngularFirestore,AngularFirestoreDocument } from '@angular/fire/firestore';
import {Observable} from "rxjs";


@Component({
  selector: 'app-edit-sponsor',
  templateUrl: './edit-sponsor.component.html',
  styleUrls: ['./edit-sponsor.component.scss']
})
export class EditSponsorComponent implements OnInit {

  private sponsorDoc : AngularFirestoreDocument<Sponsor>;
  sData : Observable<Sponsor>;


  sponsorData: Sponsor = {
    name:null,
    email:null,
    address:null,
    logo:null,
    categories:null,
    sponsoredEvents:null,
    websiteUrl:null,
    locationUrl:null,
    telephoneNo:null,
    receivedProposals:null,
    acceptedProposals:null,
    maxBudgetLimit:null,
    availability:null,
  }

  constructor(
    private firestore:AngularFirestore
    ) { 
      this.id = localStorage.getItem("spoId");

      this.sponsorDoc = firestore.collection("sponsors").doc<Sponsor>(this.id);
      this.sData = this.sponsorDoc.valueChanges();
    }
    
    data;
    // id = 'HHG0vJGCTBWway00UItl';
    id;

  ngOnInit() {
    console.log(this.id);
    this.sData.subscribe(res=>{
      this.sponsorData = res;
      console.log(this.sponsorData);
    })
    

    
  }

  getData(){  

    // this.firestore.collection('sponsors').doc(this.id).valueChanges().subscribe(data=>{
    //   this.data=data;
    //   console.log(data);
    //   this.sponsorData = data;
    // })

  }

  onSubmit(){
    // console.log(this.data.name);

    this.firestore.collection("sponsors").doc(this.id).update(this.sponsorData);
    // // console.log(this.sponsor)
    // this.firestore.firestore.collection("sponors").doc(this.id)
    //                     .update({
    //                         sponsorName:this.data.sponsorName,
    //                         sponsorAddress: this.data.sponsorAddress,
    //                         sponsorEmail:this.data.sponsorEmail
    //                       })
    //                     .then(() => console.log("updated")
    //                     )
    //                     .catch((error)=> console.log("error"));

    
  }

  

}

export interface Sponsor {
  name:string;
  email:string;
  address:string;
  logo:string;
  categories:Array<string>;
  sponsoredEvents:Array<string>;
  websiteUrl:string;
  locationUrl:string;
  telephoneNo:Array<string>;
  receivedProposals:Array<string>;
  acceptedProposals:Array<string>;
  maxBudgetLimit:number;
  availability:boolean;
}

