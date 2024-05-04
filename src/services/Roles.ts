import { Roles, RolesInterface } from "../DB/models/Roles";

export class RolesServices {
  static async createRole(role: RolesInterface) {
    const newRole = await Roles.create(role);
    return newRole;
  }

  static async delRole(idRole: string) {
    const rolDeleted = await Roles.destroy({ where: { id: idRole } });
    return rolDeleted <= 0;
  }

  static async getRoles() {
    const rowsRoles = await Roles.findAll({ limit: 20 });

    return rowsRoles;
  }

  static async getRoleById(idRole: string) {}
}
