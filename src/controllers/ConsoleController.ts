import { ServiceProvider } from "../services/ServiceProvider";

export class ConsoleController {

    /**
     * Receive the acknowledgment
     * @param msId Id of the monitored service
     */
    async acknowledge(msId: string): Promise<void> {

        // Get the monitored service from the repository
        const repository = ServiceProvider.get('repository');
        const service = await repository.get(msId);
        if(!service) {
            throw new Error(`Missing service '${msId}'`);
        }

        //
        // TODO: There is no UC for this
        //
        if(service.status === 'healthy') {
            return;
        }

        //
        // UC-3: Receive the acknowledgment
        //
        service.markAcknowledged();
        repository.save(service);
    }

    /**
     * Receive the healthy event
     * @param msId Id of the monitored service
     */
    async healthyEvent(msId: string): Promise<void> {

        // Get the monitored service from the repository
        const repository = ServiceProvider.get('repository');
        const service = await repository.get(msId);
        if(!service) {
            throw new Error(`Missing service '${msId}'`);
        }

        //
        // UC-5
        //
        service.markHealthy();
        repository.save(service);
    }
}