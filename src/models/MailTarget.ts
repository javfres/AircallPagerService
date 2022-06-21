import MailServiceI from "../services/MailServiceI";
import { ServiceProvider } from "../services/ServiceProvider";
import { MonitoredService } from "./MonitoredService";
import { Target } from "./Target";

export class MailTarget implements Target {
    mail: string;

    constructor(mail: string){
        this.mail = mail;
    }

    async notify(service: MonitoredService, msg: string): Promise<void> {
        const mailService = ServiceProvider.get('mail') as MailServiceI;
        await mailService.notify(this, service, msg);
    }

}