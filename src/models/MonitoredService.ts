import { EscalationServiceI } from "../services/EscalationServiceI";
import { ServiceProvider } from "../services/ServiceProvider";
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

    /**
     * Loads the Escalation Policy from its service
     */
    async loadPolicy() {

        const policyService = ServiceProvider.get('escalation') as EscalationServiceI;
        const policy = await policyService.get(this.id);
        if (!policy) {
            throw new Error(`Missing policy for service '${this.id}'`);
        }

        this.policy = policy;
    }


    async notify(): Promise<void> {
        
        if (!this.policy) {
            throw new Error("Policy was not loaded");
        }

        const targets = this.policy.levels[this.currentLevel].targets;

        for(const target of targets) {
            console.log("notify target", target);
            await target.notify(this, this.alertMsg);
        }

    }

    escalate(): void {
        
    }

}