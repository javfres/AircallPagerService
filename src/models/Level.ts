import { Target } from "./Target";

export class Level {

    level: number;
    targets: Target[];

    constructor(level: number, targets: Target[]) {
        this.level = level;
        this.targets = targets;
    }

}