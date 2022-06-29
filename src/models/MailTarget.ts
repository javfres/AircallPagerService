import { ServiceProvider } from "../services/ServiceProvider";
import { MonitoredService } from "./MonitoredService";
import { Target, WorkingHours } from "./Target";

/**
 * A mail target to notify
 */
export class MailTarget extends Target {

    mail: string;

    constructor(mail: string, wh: WorkingHours){
        super(wh);
        this.mail = mail;
    }

    async notify(service: MonitoredService, msg: string): Promise<void> {

        if(!this.workingHours.isWorking()) return;

        const mailService = ServiceProvider.get('mail');
        await mailService.notify(this, service, msg);
    }

}