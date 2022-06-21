import MonitoredServiceRepositoryI from "../services/MonitoredServiceRepositoryI";
import { ServiceProvider } from "../services/ServiceProvider";
import TimeServiceI from "../services/TimeServiceI";

export class AlertingController {


    /**
     * Process a new alert
     * @param msId 
     * @param msg 
     */
    async alert(msId: string, msg: string): Promise<void> {

        const repository = <MonitoredServiceRepositoryI> ServiceProvider.get('repository');

        const service = await repository.get(msId);

        if(!service) {
            throw new Error(`Missing service '${msId}'`);
        }

        await service.loadPolicy();

        service.status = 'unhealthy';
        service.alertMsg = msg;

        await service.notify();

        repository.save(service);

        const time = <TimeServiceI> ServiceProvider.get('time');
        time.addTimeout(msId, 15);

    }



}