import { TimeController } from "../src/controllers/TimeController";
import { EscalationPolicy } from "../src/models/EscalationPolicy";
import { Level } from "../src/models/Level";
import { MailTarget } from "../src/models/MailTarget";
import { MonitoredService } from "../src/models/MonitoredService";
import { ServiceProvider } from "../src/services/ServiceProvider";

//
// Create mock services
//
const mService = new MonitoredService('server-123');
mService.status = 'unhealthy';

const repositoryMock = {
    get: jest.fn().mockReturnValueOnce(mService),
    save: jest.fn(),
}

const escalationMock = {
    get: jest.fn().mockReturnValueOnce((() => {
        return new EscalationPolicy([
            new Level(0, [
                new MailTarget('demoA@aircall.com'),
                new MailTarget('demoB@aircall.com'),
            ]),
            new Level(1, [
                new MailTarget('boss@aircall.com'),
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
    ServiceProvider.register('repository', repositoryMock);
    ServiceProvider.register('escalation', escalationMock);
    ServiceProvider.register('mail', mailMock);
    ServiceProvider.register('time', timeMock);
});

//
// Test UC-2
//
test('Use Case 2', async () => {

    const controller = new TimeController();

    await controller.timeout('server-123');

    expect(mService.status).toBe("unhealthy");
    expect(mService.currentLevel).toBe(1);

    expect(repositoryMock.get.mock.calls.length).toBe(1);
    expect(repositoryMock.save.mock.calls.length).toBe(1);
    expect(mailMock.notify.mock.calls.length).toBe(1);
    expect(timeMock.addTimeout.mock.calls.length).toBe(1);
});