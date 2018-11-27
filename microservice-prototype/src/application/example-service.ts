import { Example } from '../domain/example';
import { ExampleRepository } from './example-repository';

// bad
import { DynamoExampleRepository } from '../framework/dynamo-example-repository';

export class ExampleService {

    // bad
    repo: ExampleRepository = new DynamoExampleRepository();

    exampleOperation(a: number): string {
        const example = this.repo.loadExample(a);
        return example.exampleBusinessLogic(a);
    }
}