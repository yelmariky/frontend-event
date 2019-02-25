import { Component, OnInit, ViewChild, OnDestroy, ElementRef } from '@angular/core';
import { EventUserModel } from '../model/event-user-model';

import { Configuration } from '../app.constants';
import { UserModel } from '../model/user-model';
import { ContactModel } from '../model/contact-model';
import { Router, ActivatedRoute } from "@angular/router";
import { EventsService } from '../services/events.service';
import { UploadService } from '../services/upload.service';
import { UserService } from '../services/user.service';
import { DatePipe } from '@angular/common';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { TypeEvenement } from '../model/typeEvent-model';
import { MailModel } from '../model/mail-model';

@Component({
  selector: 'acceuil',
  templateUrl: './acceuil.component.html',
  styleUrls: ['./acceuil.component.css']
})
export class AcceuilComponent implements OnInit {
  @ViewChild('eventForm') eventForm: any;
  //@ViewChild('lastnameref') private lastnameRef: ElementRef;



  confirmPassword: string;
  signin: boolean;
  user: UserModel;
  openedContact: boolean;
  opendSignin: boolean;
  openedSignup: boolean;
  opendCreateevent: boolean;
  errormessage: string;
  errormessageevent: string;
  messageUser: string;
  quotaevent: boolean;
  signup: boolean;
  okevent: boolean;
  mesgquotaevent: string;
  save_user_ok: boolean;
  searchtext: string;
  typeEvents: Array<TypeEvenement> = [];
  selectTypeEvent: TypeEvenement;
  contact: ContactModel;
  //fileUploadQueue:any;
  eventUser: any;
  iduser: string;

  selectedIdTypeEvent: number;

  constructor(private router: Router, private route: ActivatedRoute, private eventservice: EventsService, 
              private userService: UserService, private uploadService: UploadService, public config: Configuration) {

  }

  envoiContact() {
    //console.log('contact: '+JSON.stringify(this.contact));
  /*  let contacts = [];//''(this.contact);
    contacts.push(this.contact);
    this.user.contacts = contacts;
    */

   this.user.contacts[0]=this.contact;
   //console.log('contact: '+JSON.stringify(this.user));
    this.userService.updateUser(this.user, true).subscribe(() => { this.openedContact = false; this.save_user_ok = true; }, error => {
      this.errormessage = this.config.ERROR_TECHNIQUE_KO; console.log(error);
    });

  }

  openContact() {

    this.opendCreateevent = false;
    this.opendSignin = false;
    this.openedSignup = false;
    this.openedContact = true;
    this.save_user_ok = false;

    this.contact.message = '';
    this.contact.sujet = '';

  }
  signupOnSubmit() {
    this.errormessage = '';
    this.messageUser = '';
    this.signin = true;
    this.signup = true;
    this.opendCreateevent = false;
    this.mesgquotaevent = '';
    this.opendSignin = false;
    this.userService.saveUser(this.user).subscribe(res => {
      if (res) {

        this.iduser = res['idUsers'];

        //this.signup = false;
        this.openedSignup = false;
        this.save_user_ok = true;
        //  document.getElementById("closeup").click();
      } else {
        this.messageUser = this.config.USER_EXIST;
      }


    }, error => {
      this.errormessage = this.config.ERROR_TECHNIQUE_KO; console.log(error);


    });

  }


  onTypeEventSelected() {
    this.selectTypeEvent = this.typeEvents.find(typeevt => typeevt.idTypeEvent === this.selectedIdTypeEvent);

  }

  createvent() {

    if (this.eventUser != null && this.eventUser.startEvent != null && this.eventUser.endEvent != null) {

      this.eventUser.userEvent = this.user;

      this.selectTypeEvent = this.typeEvents.find(typeevt => typeevt.idTypeEvent == this.selectedIdTypeEvent);

      this.user.idUsers = this.iduser;
      this.eventUser.typeEvent = this.selectTypeEvent;
      this.quotaevent = false;
      this.uploadService.getNbreUploadFiles(this.iduser).subscribe(data => {

        if (data >= 3) {
          this.quotaevent = true;
          this.mesgquotaevent = this.config.QUOTA_NOMBRE_EVENT;
          if (document.getElementById("upfile") != null) {
            (<HTMLInputElement>document.getElementById("upfile")).disabled = true;
          }

          if (document.getElementById("progess_bar") != null) {
            document.getElementById("progess_bar").style.visibility = "hidden";
          }
          if (document.getElementById("uploadbu") != null) {
            document.getElementById("uploadbu").style.visibility = "hidden";
          }

          if (document.getElementById("btcreate_event") != null) {
            (<HTMLInputElement>document.getElementById("btcreate_event")).disabled = true;

          }

        };
      })


      this.eventservice.saveEvent(this.eventUser).subscribe(data => { this.eventservice.sendMessage(data); this.opendCreateevent = false; }
        , error => {

          if (error.status === 406) {
            this.errormessageevent = this.config.EVENT_ERROR_DATE;
          }
          else { this.errormessageevent = this.config.ERROR_TECHNIQUE_KO; console.log(error) }
        },
        () => {
          this.okevent = true;

          this.eventForm.reset();
          if (document.getElementById("upfile") != null) {
            (<HTMLInputElement>document.getElementById("upfile")).disabled = false;
          }

          if (document.getElementById("uploadbu") != null) {
            (<HTMLInputElement>document.getElementById("uploadbu")).disabled = false;

          }
          if (document.getElementById("progess_bar") != null) {
            document.getElementById("progess_bar").style.visibility = "hidden";

          }
          /*  if (document.getElementById("closevent") != null) {
              document.getElementById("closevent").click();
            }*/
        });


    }
  }
  signinOnSubmit() {
    this.opendCreateevent = false;

    this.openedSignup = false;
    this.messageUser = '';
    this.signin = true;
    this.signup = true;
    this.userService.findUser(this.user.email, this.user.password).subscribe(res => {
      if (res) {
       // this.user.email = res['email'];
          this.user=res;
        this.iduser = res['idUsers'];

        if (res['actif'] === false) {
          this.messageUser = this.config.LOGIN_DESACTIVE;

        } else {

          this.signin = false;
          this.opendSignin = false;
          this.calculNombreEvt();

        }

        //calcul le nombre d'evenement


      } else {
        this.messageUser = this.config.LOGIN_KO;
      }

    }, error => {
      if (error.status === 404) {
        this.messageUser = this.config.LOGIN_KO;
      } else {
        this.errormessage = this.config.ERROR_TECHNIQUE_KO; console.log(error);
      }


    });


  }

  calculNombreEvt() {
    this.uploadService.getNbreUploadFiles(this.iduser).subscribe(data => {

      if (data >= 3) {
        this.quotaevent = true;
        if (document.getElementById("btcreate_event") != null) {
          (<HTMLInputElement>document.getElementById("btcreate_event")).disabled = true;

        }
        this.mesgquotaevent = this.config.QUOTA_NOMBRE_EVENT;
      };
    })

  }
  closeAlert() {
    this.save_user_ok = false;
  }

  ngOnInit() {
    this.signin = true;
    this.signup = true;
    this.user = new UserModel('', '', '', '', '', false, []);
    this.searchtext = '';
    this.okevent = false;
    this.quotaevent = false;
    this.opendCreateevent = false;
    this.opendSignin = false;
    this.openedSignup = false;
    this.openedContact = false;
    this.save_user_ok = false;

    this.eventservice.getTypeEvents().subscribe(data => { this.typeEvents = data });
    this.errormessage = '';
    this.messageUser = '';

    this.eventUser = new EventUserModel('', '', '', null, null, '', '', '', 0, [],
      new TypeEvenement(0, ''), this.user);

    this.contact = new ContactModel('', '');
    let idlogin: string = '';

    this.route.params
      .subscribe((params) => {
        idlogin = params['iduser'];

        if (idlogin == 'no_user') {
          return;
        } else {
          this.iduser=idlogin;
          this.activateUser(idlogin);
          this.openSignin();

        }

      });


  }
  logout() {
    this.signin = true;
    this.signup = true;
    this.user = new UserModel('', '', '', '', '', false, []);
    this.searchtext = '';
    this.okevent = false;
    this.quotaevent = false;
    this.messageUser ='';

    this.eventUser = new EventUserModel('', '', '', null, null, '', '', '', 0, [], null, this.user);
  }
  searchEvent() {
    console.log(this.searchtext);
    this.eventservice.getEventByTitle(this.searchtext).subscribe(data => { this.eventservice.searchEvents(data); });



  }

  openSignup() {
    this.opendCreateevent = false;
    this.opendSignin = false;
    this.openedSignup = true;
    this.mesgquotaevent = '';
    this.messageUser = '';
    //this.lastnameRef.nativeElement.focus();

  }

  openSignin() {
    this.opendCreateevent = false;
    this.opendSignin = true;
    this.openedSignup = false;
    this.mesgquotaevent = '';
    this.messageUser = '';
  }
  openEvent() {
    this.opendCreateevent = true;
    this.opendSignin = false;
    this.openedSignup = false;
    this.errormessageevent='';
    this.mesgquotaevent = '';
    if (document.getElementById("progess_bar") != null) {
      document.getElementById("progess_bar").style.visibility = "hidden";
    }

    this.selectedIdTypeEvent = 1;

  }

  activateUser(iduser: string) {

    this.userService.activateUser(iduser).subscribe();

  }

  /*
  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }
  */

}
