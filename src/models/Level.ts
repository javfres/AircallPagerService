import { Target } from "./Target";

/**
 * A level of a Escalation policy with the targets to notify
 */
export class Level {

    level: number;
    targets: Target[];

    constructor(level: number, targets: Target[]) {
        this.level = level;
        this.targets = targets;
    }

}