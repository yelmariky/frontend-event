import { UserModel } from './user-model';
import { TypeEvenement } from './typeEvent-model';
import {DocumentModel} from './document-model';
export class EventUserModel{
    constructor(
        public idEvent : string,
        public titleEvent: string,
        public adressEvent: string,
        public startEvent: any,
        public endEvent: any,
        public descEvent: string,
        public organisation: string,
        public descOrganisation: string,
        public price:number,
        public images: Array<DocumentModel>,
        public typeEvenement:TypeEvenement,
        public userEvent: UserModel
       
      ) {  }
}