import { ContactModel } from "./contact-model";

export class UserModel{
    constructor(
        public idUsers : string,
        public password: string,
        public lastname: string,
        public email: string,
        public firstname: string,
        public actif: boolean,
       
        public contacts:Array<ContactModel>
      ) {  }
}