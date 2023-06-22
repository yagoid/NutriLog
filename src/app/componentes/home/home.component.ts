import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit{

  loggedIn = false;
  nombre = ""
  email = ""
  usuarios = [];

  constructor(private http: HttpClient) {}


  ngOnInit() {
    this.loggedIn = localStorage.getItem('token') !== null;
    this.email = localStorage.getItem('email') || '';

    if (this.loggedIn) {
      this.http.get('http://localhost:8000/').subscribe((data: any) => {
        
        this.usuarios = data;

        this.usuarios.forEach(user => {
          if(this.email == user['email']) {
            this.nombre = user['name'];
            this.nombre = this.nombre.charAt(0).toUpperCase() + this.nombre.substring(1);
          }
        });

      })
    }
  }

  getUser() {
    
  }

  logout() {
    localStorage.removeItem('token');
  }

}
