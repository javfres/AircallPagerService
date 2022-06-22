import { MonitoredService } from "../models/MonitoredService";
import { Target } from "../models/Target";

export default interface SMSServiceI {

    /**
     * Notify a target by SMS
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