import { APIGatewayEvent, Callback, Context, Handler } from 'aws-lambda';
import { ExampleService } from '../application/example-service';

export const hello: Handler = (event: APIGatewayEvent, context: Context, cb: Callback) => {
  const service = new ExampleService();

  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: service.exampleOperation(42)
    }),
  };

  cb(null, response);
}
