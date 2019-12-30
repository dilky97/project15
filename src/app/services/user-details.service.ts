import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { StudentDetails } from '../models/student-details.model';
import { AdvisorDetails } from '../models/advisor-details.model';

@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {

  constructor(private firestore: AngularFirestore) {

  }

  createStudentDatabase(student: StudentDetails) {
    return this.firestore.collection('students').add(student);
  }

  createAdvisorDatabase(advisor: AdvisorDetails) {
    return this.firestore.collection('students').add(advisor);
  }

}
