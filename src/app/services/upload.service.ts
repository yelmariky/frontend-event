import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import {HttpClient, HttpRequest, HttpEvent,HttpErrorResponse} from '@angular/common/http';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Configuration } from '../app.constants';

@Injectable()
export class UploadService {
public subjectUplod = new Subject<any>();
public subjectnbUplod = new Subject<any>();


  constructor( private httpClient:HttpClient,private configuration:Configuration) { }

  sendMessage(events) {
      
        this.subjectUplod.next(events);
    }
   

   

    communicateWithComponent(): Observable<any> {
        return this.subjectUplod.asObservable();
    }

    pushFileToStorage(file: File,idusers: string): Observable<HttpEvent<{}>> {
        let formdata: FormData = new FormData();
       console.log("****type: "+file.type);
       console.log("****name: "+file.name);
        formdata.append('file', file);
       
        const req = new HttpRequest('POST', this.configuration.ServerWithUploadUrl+'user/'+idusers, formdata, {
          reportProgress: true,
          responseType: 'text'
        });
     
        return this.httpClient.request(req);
      }
     
      getFiles(mail: string): Observable<any> {
        return this.httpClient.get(this.configuration.ServerWithUploadUrl+'getallfiles/user/'+mail);
      }
      //getnbuploadfiles
      getNbreUploadFiles(iduser: string): Observable<any> {
        return this.httpClient.get(this.configuration.ServerWithUsersUrl+'/_nbevent/user/'+iduser);
      }

      sendNbUpload(nbUpload) {
        
          this.subjectnbUplod.next(nbUpload);
      }


}
