import { exampleOperation } from './example-service';
import { Example } from '../domain/example';

const exampleRepository = require.requireActual('../framework/dynamo-example-repository');

describe('exampleOperation', () => {
    it('returns simple response', () => {
        exampleRepository.exampleOperation = jest.fn().mockReturnValue(new Example());

        // TODO: mock the Example.exampleBusinessLogic function

        expect(exampleOperation(42)).toEqual('This is example business logic...');
    });
});