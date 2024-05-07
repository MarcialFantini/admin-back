import { Router } from "express";
import {
  allSections,
  createRoleSections,
  deleteRoleSection,
  sectionsByRoleId,
} from "../controllers/roleSections";
import { autNormalJwt } from "../middleware/autJwt";

const roleSection = Router();

roleSection.post("/create", autNormalJwt, createRoleSections);
roleSection.delete("/delete/:id", autNormalJwt, deleteRoleSection);
roleSection.get("/sections/:id", autNormalJwt, sectionsByRoleId);
roleSection.get("/all", autNormalJwt, allSections);
export { roleSection };
