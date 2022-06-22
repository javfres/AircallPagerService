import { EscalationPolicy } from "../models/EscalationPolicy";

export interface EscalationServiceI {

    /**
     * Get the Policy associated to a monitored service
     * @param msId Id of the monitored service
     */
    get(msId: string): Promise<EscalationPolicy>;

}