import { Injectable } from '@angular/core';
import {HttpClient, HttpRequest, HttpEvent,HttpErrorResponse} from '@angular/common/http';
import { UserModel } from '../model/user-model';
import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http';
import {Configuration} from '../app.constants';
import { MailModel } from '../model/mail-model';

@Injectable()
export class UserService {

  constructor(private httpClient:HttpClient, private configuration:Configuration) { }
  
saveUser(user:UserModel): Observable<any>{
  console.log("user: "+JSON.stringify(user));
  return this.httpClient.put(this.configuration.ServerWithUsersUrl+"_save",user);

}

changePassword(password:string,iduser:string) : Observable<any>{
  let user:UserModel = new UserModel('', '', '', '', '',false,[]);
  
  user.idUsers=iduser;
  user.password=password;

  return this.httpClient.post(this.configuration.ServerWithUsersUrl+"_update/pass",user)
}

updateUser(user:UserModel,withcontact:boolean) : Observable<any>{

  return this.httpClient.post(this.configuration.ServerWithUsersUrl+"_update?ismail="+withcontact,user)
}
activateUser(iduser:string) : Observable<any>{

  return this.httpClient.post(this.configuration.ServerWithUsersUrl+"_activate",iduser)
}


findUser(email:string, pass:string): Observable<any>{
  let user:UserModel = new UserModel('', pass, '', email, '',false,[]);
  
  
  return this.httpClient.post(this.configuration.ServerWithUsersUrl+"_find",user);

}

findByIdUser(iduser:String): Observable<any>{
  
  return this.httpClient.get(this.configuration.ServerWithUsersUrl+"_get/id/"+iduser);

}
sendMailToChhangePass(mail:string): Observable<any>{
  
  return this.httpClient.get(this.configuration.ServerWithUsersUrl+"_send?mail="+mail);

}

sendMail(mail:MailModel): Observable<any>{
  
  return this.httpClient.post(this.configuration.ServerWithEmailUrl+"_send",mail);

}
private handleError(error: Response) {
  return Observable.throw(error.json().error());
}

}
