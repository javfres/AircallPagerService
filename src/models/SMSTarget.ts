import { ServiceProvider } from "../services/ServiceProvider";
import SMSServiceI from "../services/SMSServiceI";
import { MonitoredService } from "./MonitoredService";
import { Target } from "./Target";

export default class SMSTarget implements Target {

    phone: string;

    constructor(phone: string){
        this.phone = phone;
    }

    async notify(service: MonitoredService, msg: string): Promise<void> {
        const mailService = ServiceProvider.get('sms') as SMSServiceI;
        await mailService.notify(this, service, msg);
    }
}