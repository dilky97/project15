import { Component, OnInit } from '@angular/core';
import { NgForm, FormControl } from '@angular/forms';
import { from } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Sponsor } from 'src/app/models/sponsor.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-sponsor',
  templateUrl: './new-sponsor.component.html',
  styleUrls: ['./new-sponsor.component.scss']
})
export class NewSponsorComponent implements OnInit {
  
  sponsorModel = new Sponsor(); 

  uploadPath:string = "sponsors";
  

  constructor(
    private firestore : AngularFirestore,
    private fb:FormBuilder,
    private router:Router
    ) { }

  ngOnInit() {
   
  }

  message:string;

  receiveMessage($event) {
    console.log("krecived");
    console.log($event)
    this.message = $event
  }

  onSubmit(){

    console.log(this.sponsorModel);
    console.log("Id" + this.message);

    this.firestore.collection('sponsors').add({
      name:this.sponsorModel.name,
      email:this.sponsorModel.email,
      address: this.sponsorModel.address,
      logo: this.sponsorModel.logo,
      categoreis:this.sponsorModel.categories,
      websiteUrl:this.sponsorModel.websiteUrl,
      locationurl:this.sponsorModel.locationUrl,
      sponsoredEvents:this.sponsorModel.sponsoredEvents,
      telephoneNo:this.sponsorModel.telephoneNo,
      receivedProposals:this.sponsorModel.receivedProposals,
      acceptedProposals:this.sponsorModel.acceptedProposals,
      maxBudgetLimit:this.sponsorModel.maxBudgetLimit,
      availability:this.sponsorModel.availability
    }).then(doc=>{
      this.router.navigate(['./event-planner-home'])
    }
      
    )
    .catch(console.log);
  }

  upload(event){
    const randomId = Math.random().toString(36).substring(2);
    
  }
  
  
}
