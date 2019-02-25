import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable()
export class Configuration {
    public Server = environment.apiUrl;
    public EventsUrl = 'events/';
    public UploadUrl='upload/';
    public UserUrl='user/';
    public EmailUrl='mail/';
    public ServerWithEventsUrl = this.Server + this.EventsUrl;
    public ServerWithUploadUrl = this.Server + this.UploadUrl;
    public ServerWithUsersUrl = this.Server + this.UserUrl;
    public ServerWithEmailUrl = this.Server + this.EmailUrl;

    public ERROR_TECHNIQUE_KO='Problème technique, la transaction n\'a pas été prise en compte, veuillez reéssayer plus tard';
    public EVENT_ERROR_DATE="date debut superieur que date fin !!! veuillez ressaisir SVP";
    public USER_EXIST = "l'utilisateur avec la même adresse mail existe,\n merci de saisir une autre adresse mail différente";
    public LOGIN_KO="mail ou mot de pass ne sont pas correct!!!, ressayer encore fois";
    public MOT_DE_PASS_MODIFIE_OK='Le mot de pass a bien été modifié, merci de vous reconnecter'; 
    public MAIL_SEND_USER_INIT='un mail vous a été envoyé pour initialiser votre mot de pass';
    public QUOTA_NOMBRE_EVENT='Vous avez atteint le quota alloué (3 evenement par utilisateur).';
    public LOGIN_DESACTIVE='Votre compte est désactivé veuillez s\'adresser à l\'administrateur du site';
    public MAIL_CONFIRMLATION='Vous allez recevoir un mail de confirmation';
    public ENVOI_CONTACT='envoyer votre demande'
    

}