import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { UserDetailsService } from './user-details.service';
import { StudentDetails } from '../models/student-details.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginRegisterAuthService {

  authDetails: any;
  generalDetails: any;

  constructor(private router: Router, private afAuth: AngularFireAuth) {
  }

  doRegisterStudent(formData) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(formData.email, formData.password)
      .then( res => {
        res.user.updateProfile({ displayName: 'student' });
        resolve(res);
      }, err => reject(err));
    });
  }

  doRegisterAdvisor(formData) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(formData.email, formData.password)
      .then( res => {
        res.user.updateProfile({ displayName: 'advisor' });
        resolve(res);
      }, err => reject(err));
    });
  }

  doRegisterServiceProvider(formData) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(formData.email, formData.password)
      .then( res => {
        res.user.updateProfile({ displayName: 'serviceProvider' });
        resolve(res);
      }, err => reject(err));
    });
  }

  doLogin(formData) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(formData.email, formData.password)
      .then( res => {
        resolve(res);
      }, err => reject(err));
    });
  }

  getUser() {
    return this.afAuth.authState;
  }

  logOut() {
    firebase.auth().signOut();
    localStorage.setItem('uid', null);
  }


}
