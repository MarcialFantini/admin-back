import { NextFunction, Request, Response } from "express";
import { responseError } from "../utils/responseNormal";

import { rolesSectionsService } from "../services/rolesSections";

export const roleMiddleware =
  async (sectionNecessary: string) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const idRole = req.headers.role as string;

      if (!idRole) {
        responseError(res, "error to sended role", 400);
      }

      const roleCategory = await rolesSectionsService.getSectionsByIdRole(
        idRole
      );

      if (!roleCategory) {
        return responseError(res, "error to found role", 400);
      }

      const isRoleOk = roleCategory.find(
        (item) => item.section === sectionNecessary
      );

      if (!isRoleOk) {
        return responseError(res, "error to use this role", 400);
      }
      next();
    } catch (error) {
      return responseError(res, "error process role", 400, error);
    }
  };
