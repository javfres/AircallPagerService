import { Target } from "./Target";

export class MailTarget implements Target {
    mail: string;

    constructor(mail: string){
        this.mail = mail;
    }

}