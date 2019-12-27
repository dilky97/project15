import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { StudentDetails } from '../models/student-details.model';

@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {

  constructor(private firestore: AngularFirestore) {

  }

  createStudentDatabase(student: StudentDetails) {
    return this.firestore.collection('students').add(student);
  }

}
