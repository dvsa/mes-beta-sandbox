import { ExampleService } from './example-service';

describe('exampleOperation', () => {
    it('returns simple response', () => {
        // until we have DI this isn't a unit test, it is invoking the real service
        // todo: inject a mock repository
        const service: ExampleService = new ExampleService();
        expect(service.exampleOperation(42)).toEqual('This is example service...');
    });
});