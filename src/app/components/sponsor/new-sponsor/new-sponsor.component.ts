import { Component, OnInit } from '@angular/core';
import { NgForm, FormControl } from '@angular/forms';
import { from } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Sponsor } from 'src/app/models/sponsor.model';

@Component({
  selector: 'app-new-sponsor',
  templateUrl: './new-sponsor.component.html',
  styleUrls: ['./new-sponsor.component.scss']
})
export class NewSponsorComponent implements OnInit {
  
  sponsorModel = new Sponsor('','','','',''); 

  constructor(
    private firestore : AngularFirestore,
    private fb:FormBuilder
    ) { }

  ngOnInit() {
   
  }

  onSubmit(){
    console.log(this.sponsorModel);
    this.firestore.collection('sponsors').add({
      sponsorName:this.sponsorModel.sponsorName,
      sponsorAddress: this.sponsorModel.sponsorAddress,
      sponsorEmail: this.sponsorModel.sponsorEmail,
      sponsorDescription: this.sponsorModel.sponsorDescription
    })
    .catch(console.log);
  }
  

  
  


}
