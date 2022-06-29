import { MonitoredService } from "./MonitoredService";

export interface WHI {
    isWorking(): boolean;
}

export class WorkingHours {

    from: number;
    to: number;

    constructor(from: number, to: number){
        this.from = from;
        this.to = to;
    }

    isWorking(current = new Date()): boolean {
        const currentHours = current.getHours();
        return this.from < currentHours && currentHours < this.to;
    }

}


/**
 * Interface of the Target
 */
export abstract class Target {

    workingHours: WHI;

    constructor(wh: WHI){
        this.workingHours = wh;
    }

    /*
    isWorking(current = new Date()): boolean {
        return this.workingHours.isWorking(current);
    }
    */

    /**
     * Send notification to this target
     * @param service The monitored service
     * @param msg The alert message
     */
    notify(service: MonitoredService, msg: string): Promise<void> {
        throw new Error("Not implemented");
    }
}