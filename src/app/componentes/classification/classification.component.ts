import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-classification',
  templateUrl: './classification.component.html',
  styleUrls: ['./classification.component.css']
})
export class ClassificationComponent {

  clasificacion: any;

  videoLink: string;

  link_video1 = "";
  link_video2 = "";
  link_video3 = "";
  link_video4 = "";
  videos = [];

  constructor(private http: HttpClient) {}

  sendDataToFlask() {
    const videoLinkElement = document.getElementById('url-video') as HTMLInputElement;
    const videoLink = videoLinkElement.value;

    if (videoLink !== "") {
      this.clasificacion = "cargando...";

      const url = 'http://localhost:5000/clasificar'; // URL del endpoint en Flask
      const payload = { data: videoLink }; // Datos que deseas enviar al backend
    
      this.http.post(url, payload).subscribe((response: any) => {
        console.log(response);
        this.clasificacion = response.predicion;
      });
    } else {
      console.log("nada");
    }
  }

  ngOnInit() {

    // Mostrar datos de los videos de la base de datos
    this.http.get('http://localhost:8000/videos').subscribe((data: any) => {
      
      this.videos = data;

      this.link_video1 = this.videos[0]['link_vid'];
      this.link_video2 = this.videos[1]['link_vid'];
      this.link_video3 = this.videos[2]['link_vid'];
      this.link_video4 = this.videos[3]['link_vid'];

      console.log(this.link_video1);
      console.log(this.link_video2);
      console.log(this.link_video3);
      console.log(this.link_video4);
    })

    // this.http.get('http://127.0.0.1:5000/clasificar').subscribe((response: any) => {
    //   console.log(response)
    //   this.casificacion = response.predicion;
    // });
  }

}
