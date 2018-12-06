import { Example } from '../domain/example';
import { loadExample } from '../framework/dynamo-example-repository';

export function exampleOperation(a: number): string {
    const example: Example = loadExample(a);
    return example.exampleBusinessLogic(a);
}