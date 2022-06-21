import { EscalationServiceI } from "./EscalationServiceI";
import MailServiceI from "./MailServiceI";
import MonitoredServiceRepositoryI from "./MonitoredServiceRepositoryI";
import SMSServiceI from "./SMSServiceI";
import TimeServiceI from "./TimeServiceI";

type ServiceT =
    EscalationServiceI |
    MailServiceI |
    MonitoredServiceRepositoryI |
    SMSServiceI |
    TimeServiceI;

/**
 * Service Provider is used to register and retrieve the actual implementations
 * of the services uses in this application
 */
export class ServiceProvider {

    private static services: Record<string, ServiceT> =  {};

    public static register(name: string, service: ServiceT) {

        this.services[name] = service;
    }

    public static get(name: string): ServiceT {

        if(!this.services[name]) {
            throw new Error(`Implementation for ${name} has not been registered`);
        }

        return this.services[name];
    }

}