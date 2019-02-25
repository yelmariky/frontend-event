import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/filter';
import { EventUserModel } from '../model/event-user-model';
import { Subject } from 'rxjs/Subject';

import {HttpClient, HttpRequest, HttpEvent,HttpErrorResponse} from '@angular/common/http';
import {Configuration} from '../app.constants';
import { UserModel } from '../model/user-model';


@Injectable()
export class EventsService {
    public subject = new Subject<any>();
    public subjectsearchText = new Subject<any>();
    
    
    constructor(private httpClient:HttpClient, private configuration:Configuration) { }

    getEvents(iduser:string): Observable<any> {
      
        if(iduser ==='nouser' || iduser === undefined || iduser === null) {
            return this.httpClient.get(this.configuration.ServerWithEventsUrl+"_getAll");
          
        }else{
            return this.getEventsByUser(iduser);
        }
        
    }

    ///typevent/_getAll
    getTypeEvents(): Observable<any> {
      
       
            return this.httpClient.get(this.configuration.ServerWithEventsUrl+"typevent/_getAll");
          
      
        
    }
    getEventsByUser(userid:string): Observable<any> {
        
        return this.httpClient.get(this.configuration.ServerWithEventsUrl+"_get/user/id/"+userid);
           // .map((res: Response) => <EventUserModel[]>res.json());
           /* .do(data => console.log('*** event**:'+data))
            .catch(this.handleError);
            */
    }
    private handleError(error: Response) {
        return Observable.throw(error.json().error());
    }

    getEventBId(idevent:string): Observable<any> {
        
        return this.httpClient.get(this.configuration.ServerWithEventsUrl+"_get/id/"+idevent);
           // .map((res: Response) => <EventUserModel[]>res.json());
           /* .do(data => console.log('*** event**:'+data))
            .catch(this.handleError);
            */
    }

    saveEvent(event:EventUserModel){
        
        return this.httpClient.post(this.configuration.ServerWithEventsUrl+"_save",event)/*.subscribe(
            res => {
              console.log("save: "+JSON.stringify(res));
            },
            (err: HttpErrorResponse) => {
              console.log(err.error);
              console.log(err.name);
              console.log(err.message);
              console.log(err.status);
            }
          );
          */
    }
   
    getEventByTitle(title: string) {
      
        
        var listevent = this.getEvents('nouser').map(events => {return events.filter(event => event.titleEvent.indexOf(title,0)>=0)});    
        return listevent;
    }

     sendMessage(events) {
      
        this.subject.next(events);
    }
    
    searchEvents(events) {
      
        this.subjectsearchText.next(events);
    }

   

    communicateWithComponent(): Observable<any> {
        return this.subject.asObservable();
    }


    
}
