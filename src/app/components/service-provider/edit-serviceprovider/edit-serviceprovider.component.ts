import { Component, OnInit } from '@angular/core';
import { AngularFirestore,AngularFirestoreDocument } from '@angular/fire/firestore';
import {Observable} from "rxjs";
import { ServiceProviderDetails } from 'src/app/models/service-provider-details.model';

@Component({
  selector: 'app-edit-serviceprovider',
  templateUrl: './edit-serviceprovider.component.html',
  styleUrls: ['./edit-serviceprovider.component.scss']
})
export class EditServiceproviderComponent implements OnInit {

  sData : Observable<ServiceProviderDetails>;

  ServiceproviderData: ServiceProviderDetails = {} as ServiceProviderDetails ;

  constructor(
    private firestore:AngularFirestore
    ) { 
      this.id = localStorage.getItem("id");

      this.sData = firestore.collection("serviceProviders").doc(this.id).valueChanges() as Observable<ServiceProviderDetails> ;
    }
    
    data;
    
    id;

  ngOnInit() {
    console.log(this.id);
    this.sData.subscribe(res=>{
      this.ServiceproviderData = res as ServiceProviderDetails ;
      console.log(this.ServiceproviderData);
    })
    

    
  }

 

  onSubmit(){
    // console.log(this.data.name);

    this.firestore.collection("serviceProviders").doc(this.id).update(this.ServiceproviderData);
    

    
  }

  

}

