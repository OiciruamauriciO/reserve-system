import { db } from "../../../../db";
import { ReserveEntity } from "../../reserve-entity";
import { ReserveRepository } from "../../reserve-repository";

export class ReserveMysqlRepository implements ReserveRepository {
  async save(reserve: ReserveEntity): Promise<void> {
    // 1. Insertar la reserva principal
    await db.query(
      `INSERT INTO reserves (id, event_id, seats) VALUES (?, ?, ?)`,
      [reserve.id, reserve.eventId, JSON.stringify(reserve.seats)]
    );

    // 2. Insertar los asientos asociados
    const seatValues = reserve.seats.map(seat => [reserve.id, seat]);
    if (seatValues.length > 0) {
      // Crear placeholders para cada fila
      const placeholders = seatValues.map(() => '(?, ?)').join(', ');
      // Aplanar el array de arrays para pasar los valores como parámetros
      const flattenedValues = seatValues.flat();

      await db.query(
        `INSERT INTO reserve_seats (reserve_id, seat_number) VALUES ${placeholders}`,
        flattenedValues
      );
    }
  }
  async findById(id: string): Promise<ReserveEntity | null> {
    const [rows] = await db.query(
      `SELECT r.id AS reserveId, s.seat_number
      FROM reserves r
      JOIN reserve_seats s ON r.id = s.reserve_id
      WHERE r.id = ?`,
      [id]
    );

    const data = rows as any[];
    if (data.length === 0) return null;

    return {
      id: data[0].reserveId,
      eventId: data[0].event_id,
      seats: data.map(row => row.seat_number)
    };
  }
  async findByEventId(eventId: string): Promise<ReserveEntity[]> {
    const [rows] = await db.query(
      `SELECT r.id AS reserveId, s.seat_number
      FROM reserves r
      JOIN reserve_seats s ON r.id = s.reserve_id
      WHERE r.event_id = ?
      ORDER BY r.id`,
      [eventId]
    );

    const data = rows as any[];

    // Agrupar por reserva
    const grouped: Record<string, number[]> = {};
    data.forEach(row => {
      grouped[row.reserveId] = grouped[row.reserveId] || [];
      grouped[row.reserveId].push(row.seat_number);
    });

    return Object.entries(grouped).map(([id, seats]) => ({
      id,
      eventId,
      seats
    }));
  }
}
