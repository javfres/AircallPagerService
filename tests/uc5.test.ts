import { ConsoleController } from "../src/controllers/ConsoleController";
import { TimeController } from "../src/controllers/TimeController";
import { MonitoredService } from "../src/models/MonitoredService";
import { ServiceProvider } from "../src/services/ServiceProvider";

//
// Create mock services
//
const mService = new MonitoredService('server-123');
mService.status = 'unhealthy';

const repositoryMock = {
    get: jest.fn().mockReturnValue(mService),
    save: jest.fn(),
}

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
    ServiceProvider.register('mail', mailMock);
    ServiceProvider.register('time', timeMock);
});

//
// Test UC-5
//
test('Use Case 5', async () => {

    const ConsoleC = new ConsoleController();
    const TimeC = new TimeController();

    await ConsoleC.healthyEvent('server-123');

    expect(repositoryMock.save.mock.calls.length).toBe(1);
    expect(mService.status).toBe("healthy");
    expect(repositoryMock.get.mock.calls.length).toBe(1);

    await TimeC.timeout('server-123');

    expect(repositoryMock.get.mock.calls.length).toBe(2);
    expect(mailMock.notify.mock.calls.length).toBe(0);
    expect(timeMock.addTimeout.mock.calls.length).toBe(0);
});