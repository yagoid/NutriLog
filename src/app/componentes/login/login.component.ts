import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.form = this.fb.group( {
      email: '',
      password: ''
    });
  }

  submit() {

    const formData = this.form.getRawValue();
    const formEmail = document.getElementById('email');
    const formPass = document.getElementById('contrasenia');

    const data = {
      username: formData.email,
      password: formData.password,
      grant_type: 'password',
      client_id: 2,
      client_secret: 'sDik4gG3nvY10R1RC9s9xvBrAyinE3MC6zdhLnoC',
      scope: '*'
    }

    this.http.post('http://localhost:8000/oauth/token', data).subscribe(
      (result: any) => {
        localStorage.setItem('token', result.access_token);
        localStorage.setItem('email', formData.email);

        this.router.navigate(['/path_home'])

        console.log('success');
        console.log(result);
      },
      error => {
        // Cambia el color de fondo del formulario utilizando Renderer2
        this.renderer.setStyle(formEmail, 'color', 'red');
        this.renderer.setStyle(formPass, 'color', 'red');

        console.log('error');
        console.log(error);
      }
    );
  }

}
