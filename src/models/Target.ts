import { MonitoredService } from "./MonitoredService";

export interface Target {
    notify(service: MonitoredService, msg: string): Promise<void>;
}