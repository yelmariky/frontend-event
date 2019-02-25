import { AcceuilComponent } from './acceuil/acceuil.component';

import { Routes } from '@angular/router';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { OubliPasswordComponent } from './acceuil/oubli-password.component';
import { AuthGuard} from './auth-guard.service';
import { ChangePasswordComponent } from './acceuil/change-pass.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/compiler/src/core';
import { RecrutementComponent } from './acceuil/recrutement/recrutement.component';
import { TestComponent } from './acceuil/test-component';

export const routes: Routes = [
  { path: 'acceuil/:iduser', component: AcceuilComponent },
  { path: 'event-detail/:id-event', 
   // canActivate: [AuthGuard],
    component: EventDetailComponent },
  { path: 'user/oublipass', component: OubliPasswordComponent },
  {path:'changepass/:iduser',component:ChangePasswordComponent},
  {path:'recrutement',component:RecrutementComponent},
  {path:'test',component:TestComponent},
  
 { path: '',
  redirectTo: '/acceuil/no_user',
  pathMatch: 'full'
}, 
 
  { path: '**', component: PageNotFoundComponent } 
];