import { EscalationServiceI } from "./EscalationServiceI";
import MailServiceI from "./MailServiceI";
import MonitoredServiceRepositoryI from "./MonitoredServiceRepositoryI";
import SMSServiceI from "./SMSServiceI";
import TimeServiceI from "./TimeServiceI";

type EscalationServiceT = 'escalation';
type MailServiceT = 'mail';
type MonitoredServiceRepositoryT = 'repository';
type SMSServiceT = 'sms';
type TimeServiceT = 'time';

type ServiceT =
    EscalationServiceT |
    MailServiceT |
    MonitoredServiceRepositoryT |
    SMSServiceT |
    TimeServiceT;

type ServiceI =
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

    private static services: Partial<Record<ServiceT, ServiceI>> = {};

    /**
     * Register a service
     * @param name The name of the service
     * @param service The service implementation class
     */
    public static register(name: ServiceT, service: ServiceI) {
        this.services[name] = service;
    }

    public static get(name: EscalationServiceT): EscalationServiceI;
    public static get(name: MailServiceT): MailServiceI;
    public static get(name: MonitoredServiceRepositoryT): MonitoredServiceRepositoryI;
    public static get(name: SMSServiceT): SMSServiceI;
    public static get(name: TimeServiceT): TimeServiceI;

    /**
     * Get a service
     * @param name The name of the service
     * @returns The service implementation class
     */
    public static get(name: ServiceT): ServiceI {

        const service = this.services[name];

        if(!service) {
            throw new Error(`Implementation for ${name} has not been registered`);
        }

        return service;
    }
}