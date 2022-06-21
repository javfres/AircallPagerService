import { EscalationPolicy } from "../models/EscalationPolicy";

export interface EscalationServiceI {

    get(msId: string): EscalationPolicy;

}