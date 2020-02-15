import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class LoginRegisterAuthService {

  constructor(private afAuth: AngularFireAuth) { }

  doRegisterStudent(formData) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(formData.email, formData.password)
      .then( res => {
        res.user.updateProfile({ displayName: 'student' });
        if (localStorage.getItem('tempURL')) {
          res.user.updateProfile({ photoURL: localStorage.getItem('tempURL') });
          localStorage.removeItem('tempURL');
        } else {
          // tslint:disable-next-line: max-line-length
          res.user.updateProfile({ photoURL: 'https://firebasestorage.googleapis.com/v0/b/eventshubuoc.appspot.com/o/images%2Fprofile.jpg_1581593016464?alt=media&token=0263ec1f-1707-4544-b80f-41307f46dc8a' });
        }
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
