import { Level } from "./Level";

export class EscalationPolicy {

    levels: Level[];

    constructor(levels: Level[] = []) {
        this.levels = levels;
    }

}