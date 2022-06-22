import { ServiceProvider } from "../services/ServiceProvider";
import { MonitoredService } from "./MonitoredService";
import { Target } from "./Target";

/**
 * A mail target to notify
 */
export class MailTarget implements Target {

    mail: string;

    constructor(mail: string){
        this.mail = mail;
    }

    async notify(service: MonitoredService, msg: string): Promise<void> {
        const mailService = ServiceProvider.get('mail');
        await mailService.notify(this, service, msg);
    }

}