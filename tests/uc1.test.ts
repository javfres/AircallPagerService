import { AlertingController } from "../src/controllers/AlertingController";
import { EscalationPolicy } from "../src/models/EscalationPolicy";
import { Level } from "../src/models/Level";
import { MailTarget } from "../src/models/MailTarget";
import { MonitoredService } from "../src/models/MonitoredService";
import SMSTarget from "../src/models/SMSTarget";
import { WorkingHours } from "../src/models/Target";
import { ServiceProvider } from "../src/services/ServiceProvider";

//
// Create mock services
//
const mService = new MonitoredService('server-123');

const repositoryMock = {
    get: jest.fn().mockReturnValueOnce(mService),
    save: jest.fn(),
}

const workingHoursMock = {
    isWorking: () => true,
}

/*
class WorkingHoursFalse extends WorkingHours {
    isWorking(current?: Date): boolean {
        return false;
    }
}
*/

const escalationMock = {
    get: jest.fn().mockReturnValueOnce((() => {
        return new EscalationPolicy([
            new Level(0, [
                new MailTarget('demoA@aircall.com', new WorkingHours(9,18)),
                new SMSTarget('+34 55 22 32', workingHoursMock),
            ]),
        ]);
    })()),
};

const mailMock = {
    notify: jest.fn(),
};

const smsMock = {
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
    ServiceProvider.register('sms', smsMock);
});

//
// Test UC-1
//
test('Use Case 1', async () => {

    const controller = new AlertingController();

    await controller.alert('server-123', 'Server is down');

    expect(mService.alertMsg).not.toBe("");
    expect(mService.status).toBe("unhealthy");
    
    expect(repositoryMock.get.mock.calls.length).toBe(1);
    expect(repositoryMock.save.mock.calls.length).toBe(1);


    expect(mailMock.notify.mock.calls.length).toBe(1);
    expect(smsMock.notify.mock.calls.length).toBe(1);



    expect(timeMock.addTimeout.mock.calls.length).toBe(1);
});