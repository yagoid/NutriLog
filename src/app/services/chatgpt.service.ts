import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


// const apiKey = "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"

@Injectable({
  providedIn: 'root'
})


export class ChatgptService {

  header = new HttpHeaders({
    "Content-Type": "application/json",
    "Authorization": "Bearer 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"
  })

  constructor(
    private http: HttpClient
  ) { }

  gptTest(prompt: string) {
    return this.http.post('https://api.openai.com/v1/completions', 
    {"model": "text-davinci-003",
    "prompt": `Genera una receta que incluya los siguientes ingredientes: ${prompt}`, 
    "temperature": 0, 
    "max_tokens": 2048
  
  }, {headers: this.header});
  }
}