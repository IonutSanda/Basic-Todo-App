import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  logInClicked = false;

  constructor() { }

  ngOnInit(): void {
  }

  toggleClasses(){
    this.logInClicked = !this.logInClicked;
  }

}
