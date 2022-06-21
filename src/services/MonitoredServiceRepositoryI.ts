import { MonitoredService } from "../models/MonitoredService";

export default interface MonitoredServiceRepositoryI {

    save(service: MonitoredService): Promise<void>;
    get(msId: string): Promise<MonitoredService|null>;
    delete(msId: string): Promise<void>;

}