import { Router } from "express";
import {
  allSections,
  createRoleSections,
  deleteRoleSection,
  sectionsByRoleId,
} from "../controllers/roleSections";

const roleSection = Router();

roleSection.post("/create", createRoleSections);
roleSection.delete("/delete/:id", deleteRoleSection);
roleSection.get("/sections/:id", sectionsByRoleId);
roleSection.get("/all", allSections);
export { roleSection };
