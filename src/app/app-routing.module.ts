import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DirectiveComponent } from './presentation/pages/directive/directive.component';
import { FormComponent } from '@/pages/form/form.component';
import { PipeComponent } from '@/pages/pipe/pipe.component';

// IMPORTANT: Do not use the "/error" route as it will be overwritten by the Core module. More info:
// https://angular.srv.mercadona.com/latest/core-ui/page-error/info/
// IMPORTANT: Do not use the "/monitoring_nginx" route as it will be overwritten by Nginx Configuration
// IMPORTANT: Do nout user the "/callback" as it will be overwritten by the Token module. More info:
// https://angular.srv.mercadona.com/latest/development-prescription/routes/routes-not-permitted/

const routes: Routes = [
  { path: '', component: DirectiveComponent },
  { path: 'directiva', component: DirectiveComponent },
  { path: 'pipe', component: PipeComponent },
  { path: 'formulario', component: FormComponent },
  { path: '**', redirectTo: 'directiva' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
