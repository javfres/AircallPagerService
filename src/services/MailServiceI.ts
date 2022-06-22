import { MonitoredService } from "../models/MonitoredService";
import { Target } from "../models/Target";

export default interface MailServiceI {

    /**
     * Notify a target by mail
     * @param target 
     * @param service 
     * @param msg 
     */
    notify(
        target: Target,
        service: MonitoredService,
        msg: string,
    ): Promise<void>;

}