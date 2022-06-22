import { AlertingController } from "../src/controllers/AlertingController";
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
// Test UC-4
//
test('Use Case 4', async () => {

    const controller = new AlertingController();

    await controller.alert('server-123', 'Server is down - duplicated alert');

    expect(repositoryMock.get.mock.calls.length).toBe(1);
    expect(mailMock.notify.mock.calls.length).toBe(0);
    expect(timeMock.addTimeout.mock.calls.length).toBe(0);
});