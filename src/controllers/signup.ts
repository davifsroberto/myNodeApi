export class SignUpController {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handle(httpResponse: any): any {
    console.log(httpResponse);

    return {
      statusCode: 400,
    };
  }
}
