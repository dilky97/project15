import { Component, OnInit } from '@angular/core';
import { ServiceProviderDetails } from 'src/app/models/service-provider-details.model';
import { AngularFirestore,AngularFirestoreDocument } from '@angular/fire/firestore';
import {Observable} from "rxjs";

@Component({
  selector: 'app-viewsp',
  templateUrl: './viewsp.component.html',
  styleUrls: ['./viewsp.component.scss']
})
export class ViewspComponent implements OnInit {

  sData : Observable<ServiceProviderDetails>;

  ServiceproviderData: ServiceProviderDetails = {} as ServiceProviderDetails ;
  images: Observable<any[]>;
  constructor(
    private firestore:AngularFirestore
  ) {
    this.id = localStorage.getItem("listItemId");

    this.sData = firestore.collection("serviceProviders").doc(this.id).valueChanges() as Observable<ServiceProviderDetails> ;
    this.images = this.firestore.collection('spEvents', ref => ref.orderBy('date')).valueChanges({idField:'id'});
    console.log(this.images);
  }

   id;

  ngOnInit() {

    console.log(this.id);
    this.sData.subscribe(res=>{
      this.ServiceproviderData = res as ServiceProviderDetails ;
      console.log(this.ServiceproviderData);
  })

}
}
