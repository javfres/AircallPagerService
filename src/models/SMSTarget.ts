import { Target } from "./Target";

export default class SMSTarget implements Target {

    phone: string;

    constructor(phone: string){
        this.phone = phone;
    }

}