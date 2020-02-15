import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Sponsor } from '../models/sponsor.model';

@Injectable({
  providedIn: 'root'
})
export class SponsorService {

  formData : Sponsor;
  constructor(private firestore:AngularFirestore) { }

  getsponsors(){
    return this.firestore.collection('sponsors').snapshotChanges();
  }
}
