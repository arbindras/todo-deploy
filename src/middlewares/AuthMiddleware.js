import { StatusCode } from "../utils/constants.js";
import { jsonGenerate } from "../utils/helpers.js";
import Jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
const AuthMiddleware = (req, res, next) => {
  if (req.headers["auth"] === undefined) {
    return res.json(jsonGenerate(StatusCode.AUTH_ERROR, "Access Denied"));
  }

  const token = req.headers["auth"];

  try {
    const decoded = Jwt.verify(token, process.env.JWT_TOKEN_SECRET);
    console.log(decoded);

    req.userId = decoded.userId;

    return next();
  } catch (error) {
    return res.json(
      jsonGenerate(StatusCode.UNPROCESSABLE_ENTITY, "Invalid Token")
    );
  }
};

export default AuthMiddleware;
