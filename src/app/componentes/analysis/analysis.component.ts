import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.css']
})
export class AnalysisComponent {

  analisis_sentimiento: any;

  videoLink: string;

  constructor(private http: HttpClient) {}

  sendDataToFlask() {
    const videoLinkElement = document.getElementById('url-video') as HTMLInputElement;
    const videoLink = videoLinkElement.value;

    if (videoLink !== "") {
      this.analisis_sentimiento = "cargando...";

      const url = 'http://localhost:5000/analisis_sentimiento'; // URL del endpoint en Flask
      const payload = { data: videoLink }; // Datos que deseas enviar al backend
    
      this.http.post(url, payload).subscribe((response: any) => {
        console.log(response);
        this.analisis_sentimiento = response.analisis_sentimiento;
      });
    } else {
      console.log("nada");
    }
  }

}
