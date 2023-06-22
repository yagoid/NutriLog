import { Component, OnInit } from '@angular/core';
import { Configuration, OpenAIApi } from "openai";
import { ChatgptService } from '../../services/chatgpt.service';

@Component({
  selector: 'app-generator',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.css']
})

export class GeneratorComponent implements OnInit {

  title = 'gptapp';
  resGPT = '';
  prompt = '';
  enviando: boolean = false;

  constructor(
    private gpt: ChatgptService
    ) {}

  configuration = new Configuration({
    apiKey: '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'
  });


  ngOnInit(): void {
    const openai = new OpenAIApi(this.configuration);
    const response = openai.listEngines();
    // console.log('res', response);


  }

  consultar(argument: string){
    this.enviando = true;
    this.resGPT = '';

    this.resGPT = "cargando...";

    this.gpt.gptTest(argument).subscribe((res:any) => {
      console.log("res", res);
      this.resGPT = res.choices[0].text;
      this.enviando = false;
    })

  }
}

