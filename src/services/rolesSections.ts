import { QueryTypes } from "sequelize";
import { sequelize } from "../DB/connection";
import { Roles } from "../DB/models/Roles";
import {
  rolesSections,
  rolesSectionsInterface,
} from "../DB/models/rolesSections";
import { SectionsArray } from "../sections/roles";

export class rolesSectionsService {
  static async createRoleSection(roleSection: rolesSectionsInterface) {
    const newRoleSection = await rolesSections.create(roleSection);
    return newRoleSection;
  }

  static async deleteRoleSection(idRoleSection: string) {
    const rowsDeleted = await rolesSections.destroy({
      where: { id: idRoleSection },
    });
    return rowsDeleted;
  }

  static async getSectionsByIdRole(idRole: string) {
    const queryRaw = `SELECT rs.id, rs.section from "Roles" as r INNER JOIN "rolesSections" as rs ON :idRole = rs.role_id`;
    const sections = (await sequelize.query(queryRaw, {
      type: QueryTypes.SELECT,
      replacements: { idRole: idRole },
    })) as unknown as { id: string; section: string }[];
    return sections;
  }

  static async getSectionsNormal() {
    return SectionsArray;
  }
}
