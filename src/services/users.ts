import { Roles } from "../DB/models/Roles";
import { UserInterface, Users } from "../DB/models/Users";

export class UserService {
  static async createUser(user: UserInterface) {
    const isCreatedUser = await Users.create(user);
    return !!isCreatedUser;
  }

  static async delUser(idUser: string) {
    const rowsDeleted = await Users.destroy({ where: { id: idUser } });

    return rowsDeleted <= 0;
  }

  static async patchUser(idUser: string, valuesUser: UserInterface) {
    const updateUser = await Users.findByPk(idUser);
    if (!updateUser) {
      return false;
    }

    await updateUser.update(valuesUser);
    return true;
  }

  static async getPageUser(page: number, offset: number) {
    const pageUsers = await Users.findAll({
      offset: page >= 0 ? page * offset : 0,
      limit: offset,
    });

    return pageUsers;
  }

  static async getUserById(idUser: string) {
    const user = await Users.findByPk(idUser);
    return user;
  }

  static async getUsersByRol(idRole: string) {
    const usersByRol = await Roles.findByPk(idRole, {
      include: { model: Users, as: "users" },
    });
    return usersByRol;
  }
}
