import { config } from "dotenv";
import { Users } from "../DB/models/Users";
import jwt from "jsonwebtoken";
import { Roles } from "../DB/models/Roles";
import { rolesSections } from "../DB/models/rolesSections";

config();
const passJWT = process.env.JWT_PASSWORD || "hola";
export class LoginService {
  static async login(email: string, password: string) {
    const user = await Users.findOne({ where: { email } });

    if (!user) {
      return false;
    }

    if (
      user.dataValues.email !== email ||
      password !== user.dataValues.password
    ) {
      return false;
    }

    const token = jwt.sign({ id: user.dataValues.email }, passJWT);

    return token;
  }

  static async testToken(token: string) {
    try {
      const decode = (await jwt.verify(token, passJWT)) as { id: string };
      console.log(decode);
      const user = await Users.findOne({
        where: { email: decode.id },
        attributes: ["id"],
      });

      if (!user) {
        return false;
      }
      console.log("ID USER", user.dataValues.id);
      return user.dataValues.id || false;
    } catch (error) {
      return false;
    }
  }

  static async testTokenWithName(token: string) {
    try {
      console.log(token);
      const decode = (await jwt.verify(token, passJWT)) as { id: string };
      console.log(decode);
      const user = await Users.findOne({
        where: { email: decode.id },
        include: {
          model: Roles,
          foreignKey: "role_id",
          include: [{ model: rolesSections, foreignKey: "role_id" }],
        },
      });

      console.log("USER ALL", user);

      if (!user) {
        return false;
      }
      console.log("ID USER", user.dataValues.id);
      return user.dataValues.id || false;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
