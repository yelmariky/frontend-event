import { Component, OnInit ,EventEmitter, Input, Output } from '@angular/core';
import { Router, ActivatedRoute, Params  } from '@angular/router'; 
import 'rxjs/add/operator/switchMap'
import { EventUserModel } from '../model/event-user-model';

import { EventsService } from '../services/events.service';


@Component({
  selector: 'event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit {
 @Input()
  event:EventUserModel;

@Output() showListEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

   

 

     constructor(private eventservice:EventsService,
           private router: Router,
           private route: ActivatedRoute) {
  }
  ngOnInit() {
   
  }

  getBack(){
    this.showListEvent.emit(true);
}
  }
     
  


