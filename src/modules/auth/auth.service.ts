import { pool } from "../../config/db";
import bcrypt from "bcryptjs";
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
};
