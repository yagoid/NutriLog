import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './componentes/header/header.component';
import { FooterComponent } from './componentes/footer/footer.component';
import { LoginComponent } from './componentes/login/login.component';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';

import { routing } from './app-routing';  // esta línea hay que escribirlo en los proyectos
import { HomeComponent } from './componentes/home/home.component';
import { ClassificationComponent } from './componentes/classification/classification.component';
import { AnalysisComponent } from './componentes/analysis/analysis.component';
import { RegisterComponent } from './componentes/register/register.component';
import { GeneratorComponent } from './componentes/generator/generator.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    HomeComponent,
    ClassificationComponent,
    AnalysisComponent,
    RegisterComponent,
    GeneratorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IonicModule.forRoot(),
    HttpClientModule,
    ReactiveFormsModule,
    routing               // esta línea hay que escribirlo en los proyectos
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
