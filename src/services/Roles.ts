import { Roles, RolesInterface } from "../DB/models/Roles";

export class RolesServices {
  static async createRole(role: RolesInterface) {
    await Roles.create(role);
  }

  static async delRole(idRole: string) {
    const rolDeleted = await Roles.destroy({ where: { id: idRole } });
    return rolDeleted <= 0;
  }
}
