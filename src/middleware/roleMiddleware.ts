import { NextFunction, Request, RequestHandler, Response } from "express";
import { responseError } from "../utils/responseNormal";

import { rolesSectionsService } from "../services/rolesSections";
import { LoginService } from "../services/login";

export const roleMiddleware: (sectionNecessary: string) => RequestHandler =
  (sectionNecessary: string) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log(sectionNecessary);
      const authorization = req.headers.authorization as string;
      const token = authorization.split(" ")[1];
      // if (!idRole) {
      //   responseError(res, "error to sended role", 400);
      // }

      const roleCategory = await LoginService.testTokenWithName(token);

      if (!roleCategory) {
        return responseError(res, "error to found role", 400);
      }

      next();
    } catch (error) {
      return responseError(res, "error process role", 400, error);
    }
  };
