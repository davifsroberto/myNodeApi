import { Request, Response } from 'express';

import { Controller, HttpRequest } from '../../presentation/protocols';

export const adaptRoute = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      body: req.body,
    };

    const httpResponse = await controller.handle(httpRequest);
    const statusCode = httpResponse.statusCode;

    if (statusCode === 200) {
      res.status(statusCode).json(httpResponse.body);
      return;
    }

    res.status(statusCode).json({
      error: httpResponse.body.message,
    });
  };
};
