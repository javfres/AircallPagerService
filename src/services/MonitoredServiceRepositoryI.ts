import { MonitoredService } from "../models/MonitoredService";

export default interface MonitoredServiceRepositoryI {

    save(service: MonitoredService): void;
    get(msId: string): MonitoredService;
    delete(msId: string): void;

}