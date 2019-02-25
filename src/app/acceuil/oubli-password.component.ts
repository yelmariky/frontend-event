import {Component, OnInit,Input} from '@angular/core';
import { UserService } from '../services/user.service';
import { UserModel } from '../model/user-model';
import {Configuration} from '../app.constants';

@Component({
    selector: 'oubli-pass',
    templateUrl: './oubli-pass.html',
    styleUrls: ['./oubli-pass.css']
  })
  export class OubliPasswordComponent implements OnInit {
    email:string;
    user:UserModel;
    errormail:string;
    messageUser:string;

    constructor(private userService:UserService,private config:Configuration){

    }

    ngOnInit() {
      this.messageUser='';
    }

    sendmail(){
      this.userService.sendMailToChhangePass(this.email).subscribe(data =>{
        if(data){
            this.user=data;
            this.errormail='';
            this.messageUser=this.config.MAIL_SEND_USER_INIT;
            (<HTMLInputElement>document.getElementById("oublipass")).disabled = true;
        }else{
          this.errormail="le mail "+this.email +" n'existe pas ";
        }
      }, error => {
        this.errormail = "le mail "+this.email +" n'existe pas "; console.log(error); });
     
  }
  }