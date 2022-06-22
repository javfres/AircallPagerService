import { Level } from "./Level";

/**
 * Escalation policy associated with a Monitored service
 * Contains a list of levels with the targets to notify
 */
export class EscalationPolicy {

    levels: Level[];

    constructor(levels: Level[] = []) {
        this.levels = levels;
    }

}