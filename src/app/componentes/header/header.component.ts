import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})


export class HeaderComponent implements OnInit {

  loggedIn = false;

  ngOnInit() {
    this.loggedIn = localStorage.getItem('token') !== null;
  }

  logout() {
    localStorage.removeItem('token');
  }

}
