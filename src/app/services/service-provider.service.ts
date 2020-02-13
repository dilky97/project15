import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ServiceProviderService {

  constructor(private firestore:AngularFirestore) { }

  
  getServiceproviders()
  {
    return this.firestore.collection('serviceProviders').snapshotChanges();
  }
}
