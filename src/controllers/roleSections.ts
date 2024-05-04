import { NextFunction, Request, Response } from "express";
import { rolesSectionsService } from "../services/rolesSections";
import { rolesSectionsInterface } from "../DB/models/rolesSections";
import { responseError, responseNormal } from "../utils/responseNormal";

export const createRoleSections = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const roleSection = req.body as rolesSectionsInterface;

    const newRoleSection = await rolesSectionsService.createRoleSection(
      roleSection
    );

    return responseNormal(res, newRoleSection, "role assign section ", 201);
  } catch (error) {
    return responseError(res, "error to assign role section ", 500, error);
  }
};

export const deleteRoleSection = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const idRoleSection = req.params.id;

    const deleted = await rolesSectionsService.deleteRoleSection(idRoleSection);

    return responseNormal(res, {}, "role section deleted", 200);
  } catch (error) {
    return responseError(res, "error to deleted role section", 500);
  }
};

export const sectionsByRoleId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const idRoleSection = req.params.id;

    const sections = await rolesSectionsService.getSectionsByIdRole(
      idRoleSection
    );

    if (!sections) {
      throw new Error("error to found sections");
    }

    return responseNormal(res, sections, "sections founds", 200);
  } catch (error) {
    return responseError(res, "error to founds sections", 500);
  }
};

export const allSections = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const sections = await rolesSectionsService.getSectionsNormal();
  return responseNormal(res, sections, "found sections", 200);
};
