import { APIGatewayEvent, Context, Callback } from 'aws-lambda';

export const get = (_event: APIGatewayEvent, _context: Context, callback: Callback) => {
  const result = {
    status: 200,
    message: 'OK!!!! OK!!!!',
  };

  // TODO callbackを使わない方法に変更する
  callback(null, {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json:charset=UTF-8',
    },
    body: JSON.stringify(result),
  });
};
