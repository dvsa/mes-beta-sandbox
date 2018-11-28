import { hello } from './handler';

describe('hello', () => {
    it('handles a simple response', () => {
        // until we have DI this isn't a unit test, it is invoking the real service
        // todo: inject a mock
        // todo: how to test with callbacks
        //expect(hello(null, null, null)).toEqual('output-single-table');
    });
});