import { db } from "../../db";

type Response = {
  id: string;
  seats: number[];
  event: {
    id: string;
    name: string;
    date: string;
    price: number;
  };
};

export function ReserveById() {
  return async (id: string): Promise<Response | null> => {
    const [rows] = await db.query(
      `
      SELECT r.id AS reserveId, s.seat_number, e.id AS eventId, e.name, e.date, e.price
      FROM reserves r
      JOIN reserve_seats s ON r.id = s.reserve_id
      JOIN events e ON r.event_id = e.id
      WHERE r.id = ?
      `,
      [id]
    );

    const data = rows as any[];

    if (data.length === 0) return null;

    return {
      id: data[0].reserveId,
      seats: data.map((row) => row.seat_number),
      event: {
        id: data[0].eventId,
        name: data[0].name,
        date: data[0].date,
        price: data[0].price
      },
    };
  };
}
