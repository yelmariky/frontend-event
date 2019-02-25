import {Component, OnInit,Input} from '@angular/core';
import { UserService } from '../services/user.service';
import { UserModel } from '../model/user-model';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';

@Component({
    selector: 'oubli-pass',
    templateUrl: './change-pass.html',
    styleUrls: ['./change-pass.css']
  })
  export class ChangePasswordComponent implements OnInit {
    
    password:string;
    user:UserModel;
    errorchangepass:string;
    messageUser:string;
    confirmPassword:string;
    constructor(private userService:UserService,private route: ActivatedRoute,
      private router: Router){

    }

    ngOnInit() {
      this.password='';
      this.messageUser='';
      this.confirmPassword='';
    }

    changePassword(){
     

 this.route.paramMap
.switchMap((params) => {
   return this.userService.
            changePassword(this.password,params.get('iduser'))
    .do(null, err => console.log('changePassword error: ' + err.message));
   // .catch(_ => Rx.Observable.empty());
})
.subscribe(data => { this.user=data;
                      this.messageUser='Le mot de pass a bien été modifié, merci de vous reconnecter.'; 
                      (<HTMLInputElement>document.getElementById("changepass")).disabled = true;
                      });
 
  }
  }