import { Component, OnInit,Input, OnDestroy } from '@angular/core';
import { EventUserModel } from '../model/event-user-model';

import { FormGroup } from '@angular/forms/src/model';
import { EventsService } from '../services/events.service';
import { Subscription } from 'rxjs/Subscription';

import { Observable } from 'rxjs/Observable';
import { concat } from 'rxjs/operators';
import { ON_OFF_ANIMATION }   from '../animations/on-off.animation'; 
import { Router } from '@angular/router';
import {Configuration} from '../app.constants';


@Component({
  moduleId: module.id,
  animations: [ 
    ON_OFF_ANIMATION
]  ,
  selector: 'event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit, OnDestroy { 
  @Input('eventuser') eventuser: string;
  showListEvent: boolean;

  listevent: Array<EventUserModel> = [];
  //listevent: Observable<EventUserModel[]>;
  selectedEvent: EventUserModel;
  errorMessage: string;
  // subscription: Subscription;

  constructor(private eventservice: EventsService,private router: Router,private config:Configuration) {

  }


  serachEvents(title: string) {
    this.eventservice.getEventByTitle(title);
  }

  

   getImage(event) {
     
    this.showListEvent = false;
    this.selectedEvent = event;

  }
  goback(showlist:boolean){
    this.showListEvent =showlist;
  }

  ngOnInit() {

    this.showListEvent = true;

    this.eventservice.subjectsearchText.subscribe(message => {
    

      this.listevent = message;

    });

   

    
      this.eventservice.getEvents(this.eventuser).subscribe(data => {this.listevent = data},
      
      error=>{
       
         this.errorMessage=this.config.ERROR_TECHNIQUE_KO;
         console.log(error)});
       
      this.eventservice.subject.subscribe(message => {


        this.listevent = [message, ...this.listevent];
       
      });
 
  }
 
  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
  //  this.eventservice.subject.unsubscribe();
}




}
