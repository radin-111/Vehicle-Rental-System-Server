import { pool } from "../../config/db";

const getUsers = async () => {
  const result = await pool.query(
    `SELECT id,name,email,phone,role FROM users `
  );
  return result;
};
const deleteUser = async (id: string) => {
  const result = await pool.query(
    `
    DELETE FROM users WHERE id=$1    
    `,
    [id]
  );
  return result;
};

const updateUsers = async (userData: Record<string, unknown>, id: string) => {
  const { email, name, phone, role } = userData;

  const result = await pool.query(
    `
    UPDATE users SET name=$1, email=$2, phone=$3, role=$4 WHERE id=$5 RETURNING id,name,email,phone,role
    `,
    [name, email, phone, role, id]
  );

  return result;
};
export const userServices = {
  getUsers,
  deleteUser,
  updateUsers,
};
