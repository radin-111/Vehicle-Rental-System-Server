import { pool } from "../../config/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../../config";
const loginUser = async (email: string, password: string) => {
  const finalEmail = email.toLocaleLowerCase()
  const result = await pool.query(
    `
    SELECT * FROM users WHERE email=$1 
    `,
    [finalEmail]
  );

  if (result.rows.length === 0) {
    return null;
  }

  const user = result?.rows[0];
  const isMatched = await bcrypt.compare(password, user.password);

  if (!isMatched) {
    return false;
  }
  delete user.password;
  const token = jwt.sign(
    { name: user.name, email: user.email, role: user.role },
    config.jwt_secret as string,
    {
      expiresIn: "14d",
    }
  );

  return { token, user };
};

const createUser = async (userData: Record<string, unknown>) => {
  const { name, email, phone, password, role } = userData;
  const finalEmail = (email as string).toLocaleLowerCase();
  const hash = await bcrypt.hash(password as string, 15);

  const result = await pool.query(
    `
    INSERT INTO users(name, email, phone, password, role) VALUES($1,$2,$3,$4,$5) RETURNING id,name,email,phone,role
    `,
    [name, finalEmail, phone, hash, role]
  );
  return result;
};
export const authServices = {
  createUser,
  loginUser,
};
