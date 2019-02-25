import { UserModel } from './user-model';
import { TypeEvenement } from './typeEvent-model';
export class ContactModel{
    constructor(
        public sujet : string,
        public message: string
       
      ) {  }
}