import { Roles } from "../DB/models/Roles";
import { UserInterface, Users } from "../DB/models/Users";

const firstUser: UserInterface = {
  name: "Stefan",
  email: "Stefan@gmail.com",
  password: "hola123",
  role_id: "",
};

const role = { name: "admin" };

export const defaultValues = async () => {
  const isRole = await Roles.findOne({ where: { name: role.name } });

  if (isRole) {
    return;
  }

  const newRole = await Roles.create(role);

  const isUser = await Users.findOne({ where: { email: firstUser.email } });
  if (isUser) {
    return;
  }

  await Users.create({ ...firstUser, role_id: newRole.dataValues.id });
};
