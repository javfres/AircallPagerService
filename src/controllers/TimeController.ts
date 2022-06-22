import { ServiceProvider } from "../services/ServiceProvider";

export class TimeController {

    /**
     * Process a timeout
     * @param msId Id of the monitored service
     */
    async timeout(msId: string): Promise<void> {

        // Get the monitored service from the repository
        const repository = ServiceProvider.get('repository');
        const service = await repository.get(msId);
        if(!service) {
            throw new Error(`Missing service '${msId}'`);
        }

        //
        // UC-5
        // Service is healthy again - Nothing to do
        //
        if(service.status === 'healthy') {
            return;
        }

        //
        // UC-3
        // Acknowledgment message already received
        //
        if(service.acknowledged) {
            return;
        }

        //
        // UC-2
        // Escalate the notification
        //
        await service.loadPolicy();

        if(service.escalate()) {
            await service.notify();
            repository.save(service);
            ServiceProvider.get('time').addTimeout(msId, 15);
        }
    }
}
