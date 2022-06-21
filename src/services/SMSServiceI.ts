import { MonitoredService } from "../models/MonitoredService";
import { Target } from "../models/Target";

export default interface SMSServiceI {

    notify(
        target: Target,
        service: MonitoredService,
        msg: string,
    ): Promise<void>;

}