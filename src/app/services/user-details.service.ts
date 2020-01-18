import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { StudentDetails } from '../models/student-details.model';
import { AdvisorDetails } from '../models/advisor-details.model';
import { ServiceProviderDetails } from '../models/service-provider-details.model';

@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {

  constructor(private firestore: AngularFirestore) {

  }

  createStudentDatabase(student: StudentDetails , id: string ) {
    return this.firestore.collection('students').doc(id).set(student);
  }

  createAdvisorDatabase(advisor: AdvisorDetails , id: string ) {
    return this.firestore.collection('students').doc(id).set(advisor);
  }

  createServiceProviderDatabase(serviceProvider: ServiceProviderDetails , id: string ) {
    return this.firestore.collection('serviceProviders').doc(id).set(serviceProvider);
  }

  readStudentDatabase(id: string) {
    return this.firestore.collection('students').doc(id).valueChanges();
  }

  createServiceProviderDatabase(serviceProvider: ServiceProviderDetails ,id: string){
    return this.firestore.collection('serviceproviders').doc(id).set(serviceProvider);
  }
  
  readServiceProviderDatabase(id: string){
    return this.firestore.collection('serviceProviders').doc(id).valueChanges();
  }

}
