import { Injectable } from '@angular/core';
import { ClubDetails } from '../models/club-details.model';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ClubDetailsService {

  constructor(private firestore: AngularFirestore) { }

  createClubDatabase(club: ClubDetails) {
    return this.firestore.collection('clubs').add(club);
  }

  readClubDatabase(id: string) {
    return this.firestore.collection('clubs').doc(id).valueChanges();
  }

}

