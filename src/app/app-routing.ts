import { RouterModule } from "@angular/router";

// Aquí hay que poner la ruta de cada componente por el cual nos queramos mover
import { LoginComponent } from './componentes/login/login.component';
import { HomeComponent } from './componentes/home/home.component';
import { ClassificationComponent } from './componentes/classification/classification.component';
import { AnalysisComponent } from './componentes/analysis/analysis.component';
import { RegisterComponent } from './componentes/register/register.component';
import { GeneratorComponent } from './componentes/generator/generator.component';

const appRoutes = [
    {path: '', component: HomeComponent},
    {path: 'path_login', component: LoginComponent},
    {path: 'path_home', component: HomeComponent},
    {path: 'path_classification', component: ClassificationComponent},
    {path: 'path_analysis', component: AnalysisComponent},
    {path: 'path_register', component: RegisterComponent},
    {path: 'path_generator', component: GeneratorComponent},
];


// Esto no se toca
export const routing = RouterModule.forRoot(appRoutes);