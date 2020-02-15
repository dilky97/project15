import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { from } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from "@angular/forms";
import { Sponsor } from 'src/app/models/sponsor.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-sponsor',
  templateUrl: './new-sponsor.component.html',
  styleUrls: ['./new-sponsor.component.scss']
})
export class NewSponsorComponent implements OnInit {

  sponsorModel:Sponsor = {} as Sponsor ;
  

  // sponsorForm = new FormGroup({
  //     companyName: new FormControl('',Validators.required),
  //     address: new FormControl(''),
  //     email: new FormControl('',Validators.required),
  //     telephone: new FormControl('',[Validators.minLength(10),Validators.required]),
  //     maxBudgetLimit: new FormControl(''),
  //     categories: new FormControl(''),
  //     websiteUrl: new FormControl(''),
  //     password: new FormControl(''),
  //     confirmPassword: new FormControl('')
      
    // });

    // get cName (){
    //   return this.sponsorForm.get("companyName");
    // }

    // get tphone (){
    //   return this.sponsorForm.get("telephone");
    // }
    
    // get el (){
    //   return this.sponsorForm.get("email");
    // }

    


  constructor(private firestore : AngularFirestore,
    private fb:FormBuilder,
    private router:Router


    ) { 
  }


  ngOnInit() {

     this.sponsorModel.name = '';
     this.sponsorModel.email = '';
     this.sponsorModel.address = '';
     this.sponsorModel.logo = '';
     this.sponsorModel.categories = [] as Array<string>;
     this.sponsorModel.sponsoredEvents = [] as Array<string>;
     this.sponsorModel.websiteUrl = '';
     this.sponsorModel.locationUrl = '';
     this.sponsorModel.telephoneNo = [] as Array<string>;
     this.sponsorModel.receivedProposals = [] as Array<string>;
     this.sponsorModel.acceptedProposals = [] as Array<string>;
     this.sponsorModel.maxBudgetLimit = 0;
     this.sponsorModel.availability = true;
   
  }

  onSubmit(){

    console.log(this.sponsorModel);


    this.firestore.collection('sponsors').add(this.sponsorModel).then(doc=>{
      this.router.navigate(['./event-planner-home'])
    }
      
    )
    .catch(console.log);
  }

  resetForm(form: NgForm){
    form.resetForm();
    
  }

  
}
