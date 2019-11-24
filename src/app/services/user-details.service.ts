import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {

  constructor(private firestore: AngularFirestore) { }

  createStudentDatabase(formData) {
    return this.firestore.collection('students').add({
      email: formData.email,
      firstName: formData.firstName,
      lastName: formData.lastName
    });
  }

}
