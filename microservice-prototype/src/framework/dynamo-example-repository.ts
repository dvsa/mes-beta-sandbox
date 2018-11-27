import { Example } from'../domain/example';
import { ExampleRepository } from '../application/example-repository';

// this is where we'd put dynamodb integration...
export class DynamoExampleRepository implements ExampleRepository {
    
    loadExample(id: number): Example {
        // dummy example
        return new Example();
    }

    saveExample(example: Example): void {
        // another example
    }
}