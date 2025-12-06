import { pool } from "../../config/db";

const getSingleVehicle = async (id: string) => {
  const result = await pool.query(
    `
        SELECT * FROM vehicles WHERE id=$1
        `,
    [id]
  );
  return result;
};
const addVehicle = async (data: Record<string, unknown>) => {
  const {
    vehicle_name,
    type,
    registration_number,
    daily_rent_price,
    availability_status,
  } = data;
  const result = await pool.query(
    `
    INSERT INTO vehicles(vehicle_name,type,registration_number,daily_rent_price,availability_status) VALUES($1,$2,$3,$4,$5) RETURNING *
    `,
    [
      vehicle_name,
      type,
      registration_number,
      daily_rent_price,
      availability_status,
    ]
  );
  return result;
};

const getVehicles = async () => {
  const result = await pool.query(`SELECT * FROM vehicles`);
  return result;
};
const deleteVehicles = async (id: string) => {
  const result = pool.query(
    `
        DELETE FROM vehicles WHERE id=$1 RETURNING *
    `,
    [id]
  );
  return result;
};
export const vehicleServices = {
  addVehicle,
  getVehicles,
  deleteVehicles,
  getSingleVehicle,
};
