import { AuthService } from './auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.initLoginForm();
    this.initRegisterForm();
  }

  toggleClasses(){
    this.logInClicked = !this.logInClicked;
  }

  onLoginSubmit(){
    console.log(this.loginForm.value);
  }

  onRegisterSubmit(){
    // if(!this.registerForm.valid){return;}
    const email = this.registerForm.value.emailInput;
    const password = this.registerForm.value.passwordInput;
    // if(this.logInClicked){
       //...
    // }else{
      this.authService.signup(email, password).subscribe(data => {
        console.log(data);
      },
      error => {
        console.log(error);
      })
    // }
    this.registerForm.reset();
    this.logInClicked = false;
  }

  initLoginForm(){
    //add new validators for email and min length
    this.loginForm = new FormGroup({
      usernameInput: new FormControl(null, Validators.required),
      passwordInput: new FormControl(null, Validators.required)
    })
  }

  initRegisterForm(){
    this.registerForm = new FormGroup({
      emailInput: new FormControl(null, Validators.required),
      fullnameInput: new FormControl(null, Validators.required),
      usernameInput: new FormControl(null, Validators.required),
      passwordInput: new FormControl(null, Validators.required)
    })
  }
}
