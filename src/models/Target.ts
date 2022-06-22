import { MonitoredService } from "./MonitoredService";

/**
 * Interface of the Target
 */
export interface Target {

    /**
     * Send notification to this target
     * @param service The monitored service
     * @param msg The alert message
     */
    notify(service: MonitoredService, msg: string): Promise<void>;
}