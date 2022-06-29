import { ServiceProvider } from "../services/ServiceProvider";
import { MonitoredService } from "./MonitoredService";
import { Target, WorkingHours, WHI } from "./Target";

/**
 * A sms target to notify
 */
export default class SMSTarget extends Target {

    phone: string;

    constructor(phone: string, wh: WHI){
        super(wh);
        this.phone = phone;
    }

    async notify(service: MonitoredService, msg: string): Promise<void> {

        if(!this.workingHours.isWorking()) return;

        const mailService = ServiceProvider.get('sms');
        await mailService.notify(this, service, msg);
    }
}