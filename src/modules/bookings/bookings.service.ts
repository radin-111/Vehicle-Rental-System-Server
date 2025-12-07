import { pool } from "../../config/db";

const updateBooking = async (status: string, id: string) => {
  const booking = await pool.query(
    `
        SELECT * FROM bookings WHERE id=$1
        `,
    [id]
  );
  if (booking.rows.length === 0) {
    return null;
  }
  const result = await pool.query(
    `
    UPDATE bookings SET status=$1 WHERE id=$2 RETURNING *
    `,
    [status, id]
  );

  if (status === "returned") {
    const updatedVehicle = await pool.query(
      `UPDATE vehicles SET availability_status=$1 WHERE id=$2 RETURNING *`,
      ["available", result.rows[0].vehicle_id]
    );

    result.rows[0].vehicle = {
      availability_status: updatedVehicle.rows[0].availability_status,
    };
  }

  return result;
};
const getBookings = async (booking: any) => {
  if (!booking) {
    const result = await pool.query(`SELECT * FROM bookings `);

    return result;
  } else {
    const result = await pool.query(
      `    
    SELECT * FROM bookings WHERE customer_id=$1
    `,
      [booking]
    );

    return result;
  }
};

const addBooking = async (booking: Record<string, any>) => {
  const { rent_start_date, rent_end_date, vehicle_id, customer_id } = booking;

  const customer = await pool.query(
    `
    SELECT * FROM users WHERE id=$1
    `,
    [customer_id]
  );

  const vehicle = await pool.query(
    `
    SELECT * FROM vehicles WHERE id=$1
    
    `,
    [vehicle_id]
  );

  const singleVehicle = {
    vehicle_name: vehicle.rows[0].vehicle_name,
    daily_rent_price: vehicle.rows[0].daily_rent_price,
  };

  if (
    !customer ||
    !vehicle ||
    vehicle.rows[0].availability_status === "booked"
  ) {
    return null;
  }
  let endDate: Date = new Date(rent_end_date);
  let startDate: Date = new Date(rent_start_date);
  let time: number = endDate.getTime() - startDate.getTime();
  let number_of_days: number = time / (1000 * 60 * 60 * 24);
  let totalRent = number_of_days * vehicle.rows[0].daily_rent_price;
  const result = await pool.query(
    `
    INSERT INTO bookings(customer_id,vehicle_id,rent_start_date,rent_end_date,total_price,status) VALUES($1,$2,$3,$4,$5,$6) RETURNING *
    `,
    [
      customer_id,
      vehicle_id,
      rent_start_date,
      rent_end_date,
      totalRent,
      "active",
    ]
  );
  if (result.rows[0]) {
    const changeStatus = await pool.query(
      `
    UPDATE vehicles SET availability_status=$1 WHERE id=$2
    `,
      ["booked", vehicle_id]
    );
  }

  result.rows[0].vehicle = singleVehicle;
  return result;
};
export const bookingServices = {
  addBooking,
  getBookings,
  updateBooking,
};
