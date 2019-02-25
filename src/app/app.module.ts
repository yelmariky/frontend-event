import { BrowserModule } from '@angular/platform-browser';
import { NgModule , LOCALE_ID } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { MyDatePickerModule} from 'mydatepicker';
import {HttpModule} from '@angular/http';

import { CUSTOM_ELEMENTS_SCHEMA , NO_ERRORS_SCHEMA} from '@angular/core';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


import { EqualValidator } from './validator/equal-validator.directive';
import { AcceuilComponent } from './acceuil/acceuil.component';
import { EventsService } from './services/events.service';
import { EventComponent } from './event/event.component';

import { UserService } from './services/user.service';
import {UploadService} from './services/upload.service';

import { FormUploadComponent } from './acceuil/form-upload.component';
import { DetailsUploadComponent } from './acceuil/details-upload.component';
import { HttpClientModule } from '@angular/common/http';
import { EventDetailComponent } from './event-detail/event-detail.component';
import {Configuration} from './app.constants';
import { AuthGuard }            from './auth-guard.service';
import { AuthService }          from './auth.service';
import { OubliPasswordComponent } from './acceuil/oubli-password.component';
import { ChangePasswordComponent } from './acceuil/change-pass.component';
import { ClarityModule } from "@clr/angular";
import { routes } from './app.routing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/fr';
import { FooterComponent } from './footer/footer.component';
import { RecrutementComponent } from './acceuil/recrutement/recrutement.component';
import { TestComponent } from './acceuil/test-component';
registerLocaleData(localePt, 'fr-CA');



@NgModule({
  declarations: [
    AppComponent,EventComponent,PageNotFoundComponent,FormUploadComponent,
    EqualValidator,AcceuilComponent,DetailsUploadComponent,
     EventDetailComponent,OubliPasswordComponent, 
     ChangePasswordComponent, FooterComponent,TestComponent,RecrutementComponent
  ],
  
  imports: [
    
    BrowserModule,
    MyDatePickerModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpModule,
    HttpClientModule,
    ClarityModule,
    RouterModule.forRoot(routes)
    
  ],
  
  providers: [EventsService,UserService,UploadService,Configuration,AuthService,AuthGuard,{provide: LOCALE_ID, useValue: "fr-CA" }],
  schemas:[CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
