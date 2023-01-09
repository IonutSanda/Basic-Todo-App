import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  logInClicked = false;
  loginForm!: FormGroup;
  registerForm!: FormGroup;

  constructor() { }

  ngOnInit(): void {
  }

  toggleClasses(){
    this.logInClicked = !this.logInClicked;
  }

  onLoginSubmit(){

  }

  onRegisterSubmit(){

  }

}
