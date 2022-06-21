import { EscalationPolicy } from "./EscalationPolicy";

type StatusT = 'healthy' | 'unhealthy';

export class MonitoredService {

    id: string;
    status: StatusT = 'healthy';
    alertMsg = '';
    acknowledged = false;
    currentLevel = 0;
    policy: EscalationPolicy|null = null;

    constructor(id: string) {
        this.id = id;
    }

    notify(): void {

    }

    escalate(): void {

    }

}