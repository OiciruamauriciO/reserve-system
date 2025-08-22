import { db } from "../../db";
import { ReserveRepository } from "../../persistence/reserve";
import { v4 as uuidv4 } from "uuid";

type Request = {
  seats: number[];
  eventId: string;
};

type Response = {
  id: string;
};

type ResponseReserveId = {
  reserveId: string;
};

export function ReserveSave(props: { reserveRepository: ReserveRepository }) {
  return async (request: Request): Promise<Response> => {
    const id = uuidv4();

    await props.reserveRepository.save({
      id,
      seats: request.seats,
      eventId: request.eventId,
    });

    return { id };
  };
}

export function ReserveSaveSpecificRes(props: { reserveRepository: ReserveRepository }) {
  return async (request: Request): Promise<ResponseReserveId> => {
    const id = uuidv4();

    await props.reserveRepository.save({
      id,
      seats: request.seats,
      eventId: request.eventId,
    });

    // Obtener la última reserva asociada al evento (mappedEventId)
    const [rows] = await db.query(
      `SELECT r.id
      FROM reserves r
      JOIN reserve_seats s ON r.id = s.reserve_id
      JOIN events e ON r.event_id = e.id
      WHERE e.id = ?
      ORDER BY r.id DESC
      LIMIT 1;`,
      [request.eventId]
    ) as [Array<{ id: string }>, any];

    const reserveId = rows[0]?.id;

    if (!reserveId) {
      throw new Error("No se pudo obtener el ID de la reserva");
    }

    return { reserveId };
  };
}