import { APIGatewayEvent, Callback, Context, Handler } from 'aws-lambda';
import { exampleOperation } from '../application/example-service';

export const hello: Handler = (event: APIGatewayEvent, context: Context, cb: Callback) => {

  try {
      const result: String = exampleOperation(42);

      const response = {
            statusCode: 200,
            body: JSON.stringify({
            message: result
            }),
        };

      cb(null, response);  

  } catch (error) {
      cb(error);
  }
}
