import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { LoginRegisterAuthService } from 'src/app/services/login-register-auth.service';



@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})



export class TestComponent implements OnInit {

  user: firebase.User;

  constructor(private router: Router , private authService: LoginRegisterAuthService) {}


  ngOnInit() {
    this.authService.getUser().subscribe(
      user => {
        this.user = user;
      }
    );
  }

  logOut() {
    this.authService.logOut();
  }


}
