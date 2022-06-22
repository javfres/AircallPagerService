import { MonitoredService } from "../models/MonitoredService";

export default interface MonitoredServiceRepositoryI {

    /**
     * Save a monitored service
     * @param service The service to save
     */
    save(service: MonitoredService): Promise<void>;

    /**
     * Return a service from the repository
     * @param msId Id of the monitored service
     */
    get(msId: string): Promise<MonitoredService|null>;

    /**
     * Delete a monitored service
     * @param msId Id of the monitored service
     */
    delete(msId: string): Promise<void>;

}