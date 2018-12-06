import { hello } from './handler';

const exampleService = require.requireActual('../application/example-service');

describe('hello', () => {
    it('handles a successful response', () => {
        exampleService.exampleOperation = jest.fn().mockReturnValue('This is mock service...');

        const mockCallback = jest.fn();
        const expectedResponse = {
                statusCode: 200,
                body: "{\"message\":\"This is mock service...\"}",
            };

        // invoke code under test    
        hello(null, null, mockCallback);

        expect(mockCallback).toBeCalledWith(null, expectedResponse);
    });

    it('handles a unsuccessful response', () => {
        const expectedError = new Error('Oops');

        exampleService.exampleOperation = jest.fn().mockImplementation(() => {
            throw expectedError;
        });

        const mockCallback = jest.fn();

        // invoke code under test    
        hello(null, null, mockCallback);

        expect(mockCallback).toBeCalledWith(expectedError);
    });
});