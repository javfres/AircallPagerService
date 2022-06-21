import { AlertingController } from "../src/controllers/AlertingController";
import { EscalationPolicy } from "../src/models/EscalationPolicy";
import { Level } from "../src/models/Level";
import { MailTarget } from "../src/models/MailTarget";
import { MonitoredService } from "../src/models/MonitoredService";
import { EscalationServiceI } from "../src/services/EscalationServiceI";
import MailServiceI from "../src/services/MailServiceI";
import MonitoredServiceRepositoryI from "../src/services/MonitoredServiceRepositoryI";
import { ServiceProvider } from "../src/services/ServiceProvider";
import TimeServiceI from "../src/services/TimeServiceI";

//
// Create mock services
//
const repositoryMock = {
    get: jest.fn().mockReturnValueOnce(new MonitoredService('server-123')),
    save: jest.fn(),
}

const escalationMock = {
    get: jest.fn().mockReturnValueOnce((() => {
        return new EscalationPolicy([
            new Level(0, [
                new MailTarget('demoA@aircall.com'),
                new MailTarget('demoB@aircall.com'),
            ]),
        ]);
    })()),
};

const mailMock = {
    notify: jest.fn(),
};

const timeMock = {
    addTimeout: jest.fn(),
};

//
// Register the mock services
//
beforeAll(() => {
    ServiceProvider.register('repository', repositoryMock as unknown as MonitoredServiceRepositoryI);
    ServiceProvider.register('escalation', escalationMock as unknown as EscalationServiceI);
    ServiceProvider.register('mail', mailMock as unknown as MailServiceI);
    ServiceProvider.register('time', timeMock as unknown as TimeServiceI);
});

//
// Test UC-1
//
test('Use Case 1', async () => {

    const controller = new AlertingController();

    await controller.alert('server-123', 'Server is down');

    expect(repositoryMock.get.mock.calls.length).toBe(1);
    expect(repositoryMock.save.mock.calls.length).toBe(1);
    expect(mailMock.notify.mock.calls.length).toBe(2);
    expect(timeMock.addTimeout.mock.calls.length).toBe(1);
});