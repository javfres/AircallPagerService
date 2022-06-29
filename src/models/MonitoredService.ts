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


    markUnHealthy(msg: string) {
        this.status = 'unhealthy';
        this.currentLevel = 0;
        this.alertMsg = msg;
        this.acknowledged = false;
    }

    markHealthy() {
        this.status = 'healthy';
        this.currentLevel = 0;
        this.alertMsg = '';
        this.acknowledged = false;
    }

    markAcknowledged() {
        this.acknowledged = true;
    }

    /*
    get myPolicy(): Promise<> {

        if (!this.policy) {
            


        }
        
        return this.loadPolicy;
    }
    */


    async notify(): Promise<void> {
        

        const targets = this.policy.levels[this.currentLevel].targets;

        for(const target of targets) {
            await target.notify(this, this.alertMsg);
        }

    }

    escalate(): boolean {

        if (!this.policy) {
            throw new Error("Policy was not loaded");
        }

        if(this.currentLevel === this.policy.levels.length-1) {
            return false;
        }

        this.currentLevel++;
        return true;
    }

}