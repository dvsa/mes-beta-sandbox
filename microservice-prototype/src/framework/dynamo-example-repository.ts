import { Example } from'../domain/example';

// this is where we'd put dynamodb integration...
export function loadExample(id: number): Example {
    // dummy example
    return new Example();
}