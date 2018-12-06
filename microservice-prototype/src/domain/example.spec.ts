import { Example } from './example';

describe('exampleBusinessLogic', () => {
    it('returns simple response', () => {
        const model: Example = new Example();
        expect(model.exampleBusinessLogic(42)).toEqual('This is example business logic...');
    });
});