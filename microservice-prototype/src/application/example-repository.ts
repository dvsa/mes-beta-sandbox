import { Example } from '../domain/example';

export interface ExampleRepository {
    loadExample(id: number): Example;
    saveExample(example: Example): void;
}