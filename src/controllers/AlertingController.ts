import { ServiceProvider } from "../services/ServiceProvider";

export class AlertingController {

    /**
     * Process an alert
     * @param msId Id of the monitored service
     * @param msg The alert message
     */
    async alert(msId: string, msg: string): Promise<void> {

        // Get the monitored service from the repository
        const repository = ServiceProvider.get('repository');
        const service = await repository.get(msId);
        if(!service) {
            throw new Error(`Missing service '${msId}'`);
        }

        //
        // UC-4
        // Do nothing: duplicated alert with no timeout
        //
        if(service.status === 'unhealthy' ) {
            return;
        }

        //
        // UC-1
        // First alert
        //
        await service.loadPolicy();

        // Mark as unhealthy and save it
        service.markUnHealthy(msg);
        repository.save(service);

        // Notify the current alert level
        await service.notify();

        // Add a timeout
        const time = ServiceProvider.get('time');
        time.addTimeout(msId, 15);
    }
}