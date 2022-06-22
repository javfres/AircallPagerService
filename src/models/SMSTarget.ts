import { ServiceProvider } from "../services/ServiceProvider";
import { MonitoredService } from "./MonitoredService";
import { Target } from "./Target";

/**
 * A sms target to notify
 */
export default class SMSTarget implements Target {

    phone: string;

    constructor(phone: string) {
        this.phone = phone;
    }

    async notify(service: MonitoredService, msg: string): Promise<void> {
        const mailService = ServiceProvider.get('sms');
        await mailService.notify(this, service, msg);
    }
}