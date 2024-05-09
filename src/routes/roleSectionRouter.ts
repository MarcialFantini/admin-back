import { Router } from "express";
import {
  allSections,
  createRoleSections,
  deleteRoleSection,
  sectionsByRoleId,
} from "../controllers/roleSections";
import { autNormalJwt } from "../middleware/autJwt";
import { roleMiddleware } from "../middleware/roleMiddleware";
import { Sections } from "../sections/roles";

const roleSection = Router();

roleSection.post(
  "/create",
  autNormalJwt,
  roleMiddleware(Sections.roles),
  createRoleSections
);
roleSection.delete(
  "/delete/:id",
  autNormalJwt,
  roleMiddleware(Sections.roles),
  deleteRoleSection
);
roleSection.get(
  "/sections/:id",
  autNormalJwt,
  roleMiddleware(Sections.roles),
  sectionsByRoleId
);
roleSection.get(
  "/all",
  autNormalJwt,
  roleMiddleware(Sections.roles),
  allSections
);
export { roleSection };
