import { pool } from "../../config/db";

const updateVehicle = async (
  id: string,
  vehicleData: Record<string, unknown>
) => {
  const {
    vehicle_name,
    type,
    registration_number,
    daily_rent_price,
    availability_status,
  } = vehicleData;

  const vehicle = await pool.query(`SELECT * FROM vehicles WHERE id=$1`,[id])
  if(vehicle.rows.length===0){
    return null
  }
  const result = await pool.query(
    `
    UPDATE vehicles SET vehicle_name=$1,type=$2,registration_number=$3,daily_rent_price=$4,availability_status=$5 WHERE id=$6 RETURNING *
    `,
    [
      vehicle_name,
      type,
      registration_number,
      daily_rent_price,
      availability_status,
      id,
    ]
  );
  return result;
};
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
  updateVehicle,
};
